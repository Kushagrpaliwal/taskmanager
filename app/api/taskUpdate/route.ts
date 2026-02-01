import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { HTTP_STATUS } from "@/lib/httpStatus";


export async function POST(req: Request) {

    const { taskcode } = await req.json()

    try {

        await sql`
            UPDATE task SET seen = true WHERE taskcode = ${taskcode}
        `

        return NextResponse.json({ success: "Task has been Seen" }, { status: HTTP_STATUS.OK })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}