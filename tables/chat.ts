import sql from "@/lib/db";

const chat = async () => {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS chat (
        id BIGSERIAL PRIMARY KEY,
        companycode TEXT NOT NULL,
        chatid TEXT NOT NULL,
        senderid TEXT NOT NULL,
        recieverid TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await sql`
      CREATE INDEX IF NOT EXISTS idx_chat
      ON chat (chatid, created_at DESC);
    `;

        await sql`
      CREATE INDEX IF NOT EXISTS idx_company_chat
      ON chat (companycode, chatid);
    `;

        await sql`
      CREATE INDEX IF NOT EXISTS idx_is_unread
      ON chat (recieverid, is_read);
    `;

        console.log("Chat table & indexes created successfully");
        console.log("What indexes does here these just store a pointer like on chatid where are all the rows stored on the db");
        await sql.end();
    } catch (error) {
        console.error("Internal Server Error", error);
        await sql.end();
    }
};

chat();
