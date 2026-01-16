from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.profile import router as profile_router
from app.api.health import router as health_router
from app.db.database import engine
from app.db.models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DailyFix AI Mesh",
    version="0.1.0"
)

app.include_router(health_router)
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(profile_router)

@app.get("/")
def root():
    return "DailyFix AI Mesh Backend Running"
