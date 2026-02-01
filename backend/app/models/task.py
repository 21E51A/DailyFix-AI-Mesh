from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    # Status: pending, in_progress, completed, cancelled
    status = Column(String(50), default="pending")

    # Progress: 0 to 100
    progress = Column(Integer, default=0)

    priority = Column(String(50), nullable=True)
    estimated_effort = Column(String(50), nullable=True)

    ai_summary = Column(Text, nullable=True)

    # NEW FIELD: Default task or not
    is_default = Column(Integer, default=0)  # 0 = No, 1 = Yes

    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    owner = relationship("User", back_populates="tasks")
