from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None


class TaskUpdate(BaseModel):
    status: Optional[str] = None
    progress: Optional[int] = None   # ✅ ADD THIS


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    progress: int                  # ✅ ADD THIS
    priority: Optional[str]
    estimated_effort: Optional[str]
    ai_summary: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
