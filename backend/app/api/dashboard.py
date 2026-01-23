# app/api/dashboard.py
from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.schemas.dashboard import DashboardResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/", response_model=DashboardResponse)
def dashboard(current_user=Depends(get_current_user)):
    return {
        "message": f"Welcome {current_user.name}",
        "user_id": current_user.id,
        "email": current_user.email
    }
