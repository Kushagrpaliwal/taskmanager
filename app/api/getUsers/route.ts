import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { HTTP_STATUS } from "@/lib/httpStatus";

export async function GET(req: Request) {
    try {
        const res = await sql`
            SELECT id , firstname , lastname , email , password , created_at FROM users ORDER BY created_at DESC
        `
        return NextResponse.json({ sucess: "Data Fetched Success", res }, { status: HTTP_STATUS.OK })

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}