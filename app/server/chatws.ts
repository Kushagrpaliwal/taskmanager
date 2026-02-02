import sql from "@/lib/db";
import jwt from "jsonwebtoken";
import { createClient } from "redis";
import { parse } from "cookie";
import { HTTP_STATUS } from "@/lib/httpStatus";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing. Make sure .env is loaded.");
    process.exit(1);
}


/* ---------------- REDIS ---------------- */

const redis = createClient({
    url: process.env.REDIS_URL,
});

const sub = redis.duplicate();

redis.on("error", console.error);
sub.on("error", console.error);

await redis.connect();
await sub.connect();

/* ---------------- TYPES ---------------- */

type WSData = {
    companycode: string,
    membercode: string,
}

/* ---------------- AUTH ---------------- */

function getSession(req: Request) {
    const cookieHeader = req.headers.get("cookie")

    if (!cookieHeader) return null;

    const cookies = parse(cookieHeader)
    const token = cookies["access_token"]

    if (!token) {
        return null;
    }

    console.log("Cookie header:", req.headers.get("cookie"));

    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        console.log("Token verified, payload:", payload);
        return payload;

    } catch (error) {
        console.error("JWT Verification failed:", error);
        return null; // Return null on verification failure
    }

}

/* ---------------- SERVER ---------------- */


Bun.serve<WSData>({
    port: 4657,

    fetch(req, server) {
        const url = new URL(req.url);

        if (url.pathname !== "/ws") {
            return new Response("Not Found", { status: HTTP_STATUS.NOT_FOUND })
        }

        const session = getSession(req)
        if (!session) {
            console.log("No session found - Unauthorized");
            return new Response("Unauthorized", { status: HTTP_STATUS.UNAUTHORIZED })
        }

        const success = server.upgrade(req, {
            data: {
                companycode: session.companycode,
                membercode: session.memcode // Map memcode from token to membercode
            }
        })

        if (success) {
            return undefined;
        }

        return new Response("Upgrade failed", { status: 500 })
    },

    websocket: {
        /* -------- CONNECT -------- */

        async open(ws) {
            const { membercode, companycode } = ws.data;
            const channel = `chat:ws:${companycode}:${membercode}`

            await sub.subscribe(channel, (msg) => {
                ws.send(msg);
            });

            console.log("🟢 WS connected:", channel);

        },
        /* -------- MESSAGE -------- */

        async message(ws, raw) {
            const { recieverid, message } = JSON.parse(raw.toString())
            const { membercode, companycode } = ws.data;

            const msgId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const payload = JSON.stringify({
                id: msgId,
                senderid: membercode,
                recieverid,
                message,
                ts: Date.now()
            })

            await redis.publish(
                `chat:ws:${companycode}:${recieverid}`,
                payload
            )

            ws.send(payload)
        },

        async close(ws) {
            const { companycode, membercode } = ws.data;
            await sub.unsubscribe(`chat:ws:${companycode}:${membercode}`);
            console.log("🔴 WS disconnected:", membercode);
        }
    }

})

console.log("✅ Live WS server running");

