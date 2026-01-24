from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TaskResponse(TaskCreate):
    id: UUID
    status: str

    class Config:
        from_attributes = True

