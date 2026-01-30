import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import sql from "@/lib/db";


export async function GET() {

    const cookieStore = await cookies();
    const token = cookieStore.get("refresh_token")?.value;

    if (token) {
        await sql`DELETE FROM refresh_tokens WHERE token = ${token}`;
    }

    cookieStore.delete("access_token")
    cookieStore.delete("refresh_token")

    return NextResponse.json({ success: "Logged Out Successful" })

}