import sql from "@/lib/db";

const teams = async () => {

    try {

        await sql`  
         CREATE TABLE IF NOT EXISTS teams(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(600) NOT NULL ,
            members TEXT[] NOT NULL,
            teamCode VARCHAR(20) UNIQUE NOT NULL,
            companyCode VARCHAR(20) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`

        console.log("Table is Successfully Created")
        sql.end();
    } catch (error) {
        console.log("Unable To Create the Table")
        sql.end();
    }

}


teams();