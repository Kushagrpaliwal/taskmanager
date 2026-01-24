from fastapi import APIRouter

router = APIRouter(
    prefix="/member",
    tags=["Members"]
)

@router.get("/")
async def list_members():
    return {"members": ["kushagra", "chandi"] , "churaan":1 , "chapli":2}

@router.get("/active")
async def active_members():
    return {"active": ["kushagra"]}
