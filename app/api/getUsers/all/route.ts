import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { HTTP_STATUS } from "@/lib/httpStatus";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
    try {

        const res = await sql`SELECT * FROM users`

        return NextResponse.json({ success: "Showing all users", res }, { status: HTTP_STATUS.OK })

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}