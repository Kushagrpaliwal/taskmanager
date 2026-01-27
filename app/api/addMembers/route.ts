import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { HTTP_STATUS } from "@/lib/httpStatus";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("access_Token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized Access" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }

        const payload = jwt.verify(token, JWT_SECRET)

        if (typeof payload === 'string' || !payload.userId) {
            return NextResponse.json({ error: "Invalid Token" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }

        const userId = payload.userId;

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }


}