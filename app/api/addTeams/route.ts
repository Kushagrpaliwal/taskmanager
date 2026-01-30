import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { HTTP_STATUS } from "@/lib/httpStatus";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Invalid Token" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }

        const payload = jwt.verify(token, JWT_SECRET) as any;

        if (!payload || !payload.userId) {
            return NextResponse.json({ error: "Invalid Token" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }

        const userId = payload.userId;

        const cc = await sql`SELECT companycode FROM users WHERE id = ${userId}`


        if (cc.length === 0) {
            return NextResponse.json({ error: "User Not Found" }, { status: HTTP_STATUS.NOT_FOUND })
        }

        const cookieCompanyCode = cc[0].companycode;

        const teamCode = `TEAM-${randomUUID().slice(0, 8).toUpperCase()}`;

        const { name, description, members } = await req.json();

        const res = await sql`
            INSERT INTO teams (name, description, members, teamCode, companyCode) VALUES
             (${name} , ${description} , ${members} , ${teamCode} , ${cookieCompanyCode} ) RETURNING id , name , description , members , teamCode , companyCode
        `

        return NextResponse.json({ success: "Team Added Successfully", res }, { status: HTTP_STATUS.OK })

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}