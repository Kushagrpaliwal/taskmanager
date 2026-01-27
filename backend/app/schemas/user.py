from datetime import datetime
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    firstname: str
    lastname: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True
