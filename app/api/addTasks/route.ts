import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { HTTP_STATUS } from "@/lib/httpStatus";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

type taskBody = {
    topic: string,
    description: string,
    priority: string,
    assignee: string,
    status: string,
    tags?: string
}

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Token Not Found" }, { status: HTTP_STATUS.NOT_FOUND })
        }

        const payload = jwt.verify(token, JWT_SECRET) as any;

        if (!payload || !payload.memcode || !payload.companycode) {
            return NextResponse.json({ error: "Unauthorized Access" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }

        const membercode = payload.memcode;

        const companycode = payload.companycode;

        const userId = payload.userId;
        const userResult = await sql`SELECT firstname, lastname FROM users WHERE id = ${userId}`;
        if (userResult.length === 0) {
            return NextResponse.json({ error: "User Not Found" }, { status: HTTP_STATUS.NOT_FOUND });
        }
        const user = userResult[0];
        const assignby = `${user.firstname} ${user.lastname}`;

        const taskcode = `TASK-${randomUUID().slice(0, 8).toUpperCase()}`

        const { topic, description, priority, assignee, status, tags }: taskBody = await req.json();

        // Ensure all values match the columns:
        // topic, description, priority, assignby, assignee, companycode, taskcode, status, tags
        const res = await sql`
            INSERT INTO task (topic, description, priority, assignby , assignee, companycode , taskcode , status , tags ) 
            VALUES (${topic}, ${description}, ${priority}, ${assignby}, ${assignee}, ${companycode} , ${taskcode}, ${status}, ${tags ?? null})
        `

        return NextResponse.json({ success: "Task Created SuccessFully", res }, { status: HTTP_STATUS.OK })

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}