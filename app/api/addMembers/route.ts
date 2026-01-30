import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { HTTP_STATUS } from "@/lib/httpStatus";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("access_token")?.value;

        if (!token) {
            console.log("No token found in cookies");
            return NextResponse.json({ error: "Unauthorized Access" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }

        const payload = jwt.verify(token, JWT_SECRET) as any;

        if (!payload || !payload.userId) {
            console.log("Invalid token payload:", payload);
            return NextResponse.json({ error: "Invalid Token" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }

        const userId = payload.userId;

        const rowcode = await sql`SELECT companycode FROM users WHERE id = ${userId}`

        if (rowcode.length === 0) {
            return NextResponse.json({ error: "User Not Found" }, { status: HTTP_STATUS.NOT_FOUND })
        }

        const code = rowcode[0].companycode;

        const membercode = `MEM-${randomUUID().slice(0, 8).toUpperCase()}`;

        const { firstname, lastname, email, password, role } = await req.json();

        const res = await sql`
            INSERT INTO users (firstname, lastname, email, password, role , memberCode , companyCode ) VALUES (${firstname} , ${lastname}, ${email} , ${password} , ${role} , ${membercode} , ${code})
            RETURNING  id , firstname , lastname , email , role , companycode , membercode
        `

        return NextResponse.json({ success: "Member Added Successfully", res }, { status: HTTP_STATUS.OK })

    } catch (error) {
        console.error("Error adding member:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}