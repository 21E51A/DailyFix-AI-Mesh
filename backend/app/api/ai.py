from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.ai import TaskAnalysisRequest, TaskAnalysisResponse
from app.db.database import get_db
from app.models.task import Task
from app.models.user import User
from app.core.security import get_current_user

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/analyze-task", response_model=TaskAnalysisResponse)
def analyze_task(
    data: TaskAnalysisRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # 🔹 TEMP AI LOGIC
    title_lower = data.title.lower()

    priority = "high" if "urgent" in title_lower else "medium"
    estimated_effort = "3–5 hours"
    summary = f"Task analysis for: {data.title}"
    recommended_status = "in_progress"

    # 🔹 FIND LATEST USER TASK
    task = (
        db.query(Task)
        .filter(Task.owner_id == current_user.id)
        .order_by(Task.id.desc())
        .first()
    )

    if not task:
        raise HTTPException(status_code=404, detail="No task found")

    # 🔹 SAVE AI DATA
    task.priority = priority
    task.estimated_effort = estimated_effort
    task.ai_summary = summary
    task.status = recommended_status

    db.commit()
    db.refresh(task)

    return {
        "priority": priority,
        "summary": summary,
        "estimated_effort": estimated_effort,
        "recommended_status": recommended_status,
    }
