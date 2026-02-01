from pydantic import BaseModel


class DashboardResponse(BaseModel):
    total_tasks: int
    completed: int
    pending: int
