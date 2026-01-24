from fastapi import FastAPI
from app.routers import task
from app.routers import member

app = FastAPI(title="Task Manager API")

app.include_router(task.router)
app.include_router(member.router)

@app.get("/")
async def health():
    return {"status": "ok"}
