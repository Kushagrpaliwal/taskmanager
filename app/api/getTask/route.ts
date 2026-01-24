import sql from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    const tasks = await sql`
    SELECT id, title, completed, created_at
    FROM tasks
    ORDER BY created_at DESC
  `
    return NextResponse.json(tasks)
}
