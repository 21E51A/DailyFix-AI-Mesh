from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.database import get_db
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.ai.task_analyzer import analyze_task
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(prefix="/tasks", tags=["Tasks"])


# ---------------- CREATE TASK ----------------
@router.post("/", response_model=TaskResponse)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ai = analyze_task(task.title, task.description)

    db_task = Task(
        title=task.title,
        description=task.description,

        status=ai["recommended_status"],
        priority=ai["priority"],
        estimated_effort=ai["estimated_effort"],
        ai_summary=ai["summary"],

        progress=0,
        owner_id=current_user.id,
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


# ---------------- GET TASKS ----------------
@router.get("/", response_model=List[TaskResponse])
def get_tasks(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    query = db.query(Task).filter(Task.owner_id == current_user.id)

    if status:
        query = query.filter(Task.status == status)

    return query.all()


# ---------------- UPDATE TASK ----------------
@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    db_task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
    ).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.status:
        db_task.status = task.status

    if task.progress is not None:
        if task.progress < 0 or task.progress > 100:
            raise HTTPException(status_code=400, detail="Progress must be 0–100")

        db_task.progress = task.progress

        # Auto complete
        if task.progress == 100:
            db_task.status = "completed"

    db.commit()
    db.refresh(db_task)

    return db_task


# ---------------- COMPLETE TASK ----------------
@router.put("/{task_id}/complete")
def complete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.status = "completed"
    task.progress = 100

    db.commit()

    return {"message": "Task completed"}


# ---------------- CANCEL TASK ----------------
@router.put("/{task_id}/cancel")
def cancel_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.status = "cancelled"

    db.commit()

    return {"message": "Task cancelled"}


# ---------------- DELETE TASK ----------------
@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted"}
