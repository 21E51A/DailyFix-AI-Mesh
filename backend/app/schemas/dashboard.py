from pydantic import BaseModel, EmailStr

class DashboardResponse(BaseModel):
    message: str
    user_id: int
    email: EmailStr
