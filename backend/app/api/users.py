from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.db.database import get_db
from app.models.user import User
from app.core.security import hash_password

router = APIRouter(prefix="/users", tags=["Users"])

# ✅ Pydantic schema
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

# ✅ ACCEPT BOTH /users AND /users/
@router.post("", include_in_schema=False)
@router.post("/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}
