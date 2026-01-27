from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse

router = APIRouter(prefix="/users")

@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):

    # Check if user already exists
    result = await db.execute(select(User).filter(User.email == user.email))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Email Already Exists")
    
    new_user = User(
        firstname=user.firstname,
        lastname=user.lastname,
        email=user.email,
        password=user.password,
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user
