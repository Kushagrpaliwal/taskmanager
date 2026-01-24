from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskResponse

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/", response_model=TaskResponse)
async def create_task(
    payload: TaskCreate,
    db: AsyncSession = Depends(get_db)
):
    task = Task(**payload.dict())
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task

@router.get("/", response_model=list[TaskResponse])
async def list_tasks(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Task))
    return result.scalars().all()
