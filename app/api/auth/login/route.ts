import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import sql from "@/lib/db";
import { HTTP_STATUS } from "@/lib/httpStatus";

const JWT_SECRET = process.env.JWT!;

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // 1️⃣ Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password both are needed" },
                { status: HTTP_STATUS.BAD_REQUEST }
            );
        }

        // 2️⃣ Find user
        const existinguser = await sql`
      SELECT id, password FROM users WHERE email = ${email}
    `;

        if (existinguser.length === 0) {
            return NextResponse.json(
                { error: "User is not registered" },
                { status: HTTP_STATUS.NOT_FOUND }
            );
        }

        const user = existinguser[0];

        // 3️⃣ Password check (DEV)
        if (user.password !== password) {
            return NextResponse.json(
                { error: "Password isn't matching" },
                { status: HTTP_STATUS.UNAUTHORIZED }
            );
        }

        // 2️⃣ Generate ACCESS TOKEN (JWT)


        // 5️⃣ Success
        return NextResponse.json(
            { success: "Login successful", userId: user.id },
            { status: HTTP_STATUS.OK }
        );

    } catch (error) {
        console.error("Unable to login", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
        );
    }
}
