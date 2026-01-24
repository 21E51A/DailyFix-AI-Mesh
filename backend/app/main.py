from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# 🔹 Import database
from app.db.database import Base, engine

# 🔹 Import models FIRST
from app.models import user, task


# 🔹 Import routers
from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.tasks import router as tasks_router
from app.api.profile import router as profile_router
from app.api.dashboard import router as dashboard_router
from app.api.ai import router as ai_router
from app.api.health import router as health_router

# 🔹 Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DailyFix AI Mesh",
    version="0.1.0"
)

# ✅ ADD THIS (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Register routes
app.include_router(health_router)
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(profile_router)
app.include_router(tasks_router)
app.include_router(ai_router)

@app.get("/")
def root():
    return "DailyFix AI Mesh Backend Running"
