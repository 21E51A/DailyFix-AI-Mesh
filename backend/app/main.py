from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine

# IMPORT MODELS (DO NOT REMOVE)
from app.models import user, task

from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.tasks import router as tasks_router
from app.api.profile import router as profile_router
from app.api.dashboard import router as dashboard_router
from app.api.ai import router as ai_router
from app.api.health import router as health_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="DailyFix AI Mesh", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # ALLOW FRONTEND SERVICE
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(tasks_router)
app.include_router(profile_router)
app.include_router(dashboard_router)
app.include_router(ai_router)

@app.get("/")
def root():
    return {"status": "Backend Running"}
