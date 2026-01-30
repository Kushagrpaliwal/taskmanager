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

        await sql`
            ALTER TABLE refresh_tokens
            ADD COLUMN IF NOT EXISTS memberCode VARCHAR(255) UNIQUE;
        `
        await sql`
            ALTER TABLE refresh_tokens
            ADD COLUMN IF NOT EXISTS companycode VARCHAR(255) UNIQUE;
        `

        console.log("Table Created Successfully")
        sql.end()

    } catch (error) {
        console.log("Error Creating the table")
        sql.end();
    }

}

token()