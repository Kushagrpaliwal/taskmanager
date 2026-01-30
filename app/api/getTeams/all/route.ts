import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { HTTP_STATUS } from "@/lib/httpStatus";

export async function GET(req: Request) {
    try {

        const res = await sql`SELECT * FROM teams`

        return NextResponse.json({ success: "Showing all teams", res }, { status: HTTP_STATUS.OK })

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}