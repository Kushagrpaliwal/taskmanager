import sql from "@/lib/db";

const task = async () => {

    try {

        await sql`
            CREATE TABLE IF NOT EXISTS task(
                id SERIAL PRIMARY KEY UNIQUE,
                topic VARCHAR(255) NOT NULL ,
                description TEXT NOT NULL ,
                priority TEXT NOT NULL ,
                assignby TEXT NOT NULL ,
                assignee TEXT NOT NULL ,
                companycode TEXT NOT NULL ,
                taskcode TEXT NOT NULL ,
                status TEXT NOT NULL ,
                tags TEXT ,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )   
        `

        await sql`
            ALTER TABLE task
                ADD COLUMN IF NOT EXISTS duedate DATE ;
        `

        await sql`
            ALTER TABLE task
             ADD COLUMN IF NOT EXISTS seen BOOLEAN DEFAULT FALSE ;
        `

        console.log("Table created successfully")
        sql.end()
    } catch (error) {
        console.log("Internal server error")
        sql.end()
    }

}

task()