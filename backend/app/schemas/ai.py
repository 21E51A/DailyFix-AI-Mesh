from pydantic import BaseModel
from typing import Optional


class TaskAnalysisRequest(BaseModel):
    title: str
    description: Optional[str] = None


class TaskAnalysisResponse(BaseModel):
    priority: str
    summary: str
    estimated_effort: str
    recommended_status: str
