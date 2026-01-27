import sql from "../lib/db"


const table = async () => {

    try {
        await sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(50),
            lastname VARCHAR(50),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `

        await sql`
         ALTER TABLE users
         ADD COLUMN IF NOT EXISTS role VARCHAR(255) DEFAULT 'Admin'
        `
        await sql`
         ALTER TABLE users
         ADD COLUMN IF NOT EXISTS team VARCHAR(255) 
        `
        await sql`
         ALTER TABLE users
         ADD COLUMN IF NOT EXISTS status VARCHAR(255) DEFAULT 'active'
        `
        await sql`
         ALTER TABLE users
         ADD COLUMN IF NOT EXISTS companyCode VARCHAR(20) UNIQUE
        `;

        console.log("Table Created Successfully")
    }
    catch (error) {
        console.log("Table Not Created", error)
    } finally {
        sql.end();
    }

}

table();

