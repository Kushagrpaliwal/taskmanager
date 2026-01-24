import sql from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { title } = await req.json()

    const [task] = await sql`
    INSERT INTO tasks (title)
    VALUES (${title})
    RETURNING *
  `

    return NextResponse.json(task, { status: 201 })
}
