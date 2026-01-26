import sql from "@/lib/db";

const token = async () => {

    try {
        await sql`
            CREATE TABLE IF NOT EXISTS refresh_tokens(
                id SERIAL PRIMARY KEY ,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ,
                token TEXT NOT NULL UNIQUE ,
                expires_at TIMESTAMP NOT NULL ,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `
        console.log("Table Created Successfully")

    } catch (error) {
        console.log("Error Creating the table")
    }

}

token()