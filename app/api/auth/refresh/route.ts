import { NextResponse } from "next/server";
import { HTTP_STATUS } from "@/lib/httpStatus";
import sql from "@/lib/db";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

async function refreshTokens() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value

    if (!refreshToken) {
        return { error: "No Refresh Token", status: HTTP_STATUS.NOT_FOUND };
    }

    const tokens = await sql`
            SELECT id , user_id , expires_at FROM refresh_tokens WHERE token = ${refreshToken}
        `

    if (tokens.length === 0) {
        return { error: "No Refresh Token in DB", status: HTTP_STATUS.NOT_FOUND };
    }

    const token = tokens[0];

    if (new Date(token.expires_at) < new Date()) {
        await sql`
                DELETE FROM refresh_tokens WHERE token = ${token.id}
            `
        return { error: "Token is Expired", status: HTTP_STATUS.UNAUTHORIZED };
    }

    await sql` DELETE FROM refresh_tokens WHERE token = ${token.id}`

    const newAccessToken = jwt.sign(
        { user_id: token.user_id },
        JWT_SECRET,
        { expiresIn: "15m" }
    )

    const newRefreshToken = crypto.randomBytes(40).toString("hex")
    const newRefreshExpiry = new Date();

    newRefreshExpiry.setDate(newRefreshExpiry.getDate() + 30);

    await sql`
            INSERT INTO refresh_tokens (user_id , token , expires_at) values (${token.user_id},${newRefreshToken},${newRefreshExpiry})
        `

    cookieStore.set("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.BUN_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 15
    })

    cookieStore.set("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: process.env.BUN_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
    })

    return { success: true };
}

export async function POST(req: Request) {
    try {
        const result = await refreshTokens();

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: result.status })
        }

        return NextResponse.json({ success: "Tokens Refreshed" }, { status: HTTP_STATUS.OK })

    } catch (error) {
        console.error("Internal Server Error", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const redirectPath = searchParams.get("redirect") || "/";

        const result = await refreshTokens();

        if (result.error) {
            // If refresh failed (e.g. invalid token), redirect to login
            const response = NextResponse.redirect(new URL("/", req.url));
            response.cookies.delete("access_token");
            response.cookies.delete("refresh_token");
            return response;
        }

        // Redirect back to the original destination
        return NextResponse.redirect(new URL(redirectPath, req.url));

    } catch (error) {
        console.error("Internal Server Error", error)
        const response = NextResponse.redirect(new URL("/", req.url));
        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");
        return response;
    }
}