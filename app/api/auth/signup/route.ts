import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { HTTP_STATUS } from "@/lib/httpStatus";

export async function POST(req: Request) {
    try {

        const { firstname, lastname, email, password, confirmPassword } = await req.json();

        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            return NextResponse.json({ error: "All Fields are required" }, { status: HTTP_STATUS.BAD_REQUEST })
        }

        const existinguser = await sql`
            SELECT id FROM users WHERE email = ${email} ;
        `

        if (existinguser.length > 0) {
            return NextResponse.json({ error: "Email already exists" }, { status: HTTP_STATUS.FOUND })
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: "Password doesn't Matched" }, { status: HTTP_STATUS.BAD_REQUEST })
        }

        const prefix = 'CMP'
        let randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
        let code = `${prefix}-${randomPart}`

        let duplicate = await sql`
            SELECT id FROM users WHERE companyCode = ${code}
        `

        while (duplicate.length > 0) {
            randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
            code = `${prefix}-${randomPart}`
            duplicate = await sql`
                SELECT id FROM users WHERE companyCode = ${code}
            `
        }

        const user = await sql`
          INSERT INTO users (firstname,lastname,email,password,companyCode) VALUES (${firstname} , ${lastname} , ${email} , ${password} , ${code})
          RETURNING id , firstname , lastname , email , companyCode 
        `

        return NextResponse.json({ sucess: user }, { status: HTTP_STATUS.CREATED })

    } catch (error) {
        console.log("There is an error when creating the user", error)
        return NextResponse.json({ error: "Internal server error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}