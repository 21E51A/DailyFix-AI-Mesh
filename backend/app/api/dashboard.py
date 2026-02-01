from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.database import get_db
from app.models.task import Task
from app.models.user import User
from app.schemas.dashboard import DashboardResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/", response_model=DashboardResponse)
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    # Get all user tasks
    tasks = db.query(Task).filter(
        Task.owner_id == current_user.id
    ).all()

    total_tasks = len(tasks)

    completed = len([
        t for t in tasks if t.status == "completed"
    ])

    pending = len([
        t for t in tasks if t.status != "completed"
    ])

    return {
        "total_tasks": total_tasks,
        "completed": completed,
        "pending": pending,
    }
