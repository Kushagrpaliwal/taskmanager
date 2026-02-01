import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { HTTP_STATUS } from "@/lib/httpStatus";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Token Not Found" }, { status: HTTP_STATUS.NOT_FOUND })
        }

        const payload = jwt.verify(token, JWT_SECRET) as any

        if (!payload || !payload.userId) {
            return NextResponse.json({ error: "Unauthorized accesss" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }

        const userId = payload.userId;
        const membercode = payload.memcode;

        const row = await sql`SELECT * FROM users WHERE id = ${userId}`

        const code = row[0].companycode;

        const res = await sql`
            SELECT id , topic , description , priority , assignby , assignee , companycode , taskcode , status , tags , duedate , seen , created_at FROM task WHERE companycode = ${code} AND assignee = ${membercode} ORDER BY created_at DESC
        `
        return NextResponse.json({ sucess: "Data Fetched Success", res }, { status: HTTP_STATUS.OK })

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}