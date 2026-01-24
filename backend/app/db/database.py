import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from urllib.parse import quote_plus

# Read environment variables
DB_USER = os.getenv("DB_USER")
DB_PASSWORD_RAW = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "3306")  # default MySQL port
DB_NAME = os.getenv("DB_NAME")

# ---- VALIDATION (VERY IMPORTANT) ----
missing_vars = []
for name, value in {
    "DB_USER": DB_USER,
    "DB_PASSWORD": DB_PASSWORD_RAW,
    "DB_HOST": DB_HOST,
    "DB_NAME": DB_NAME,
}.items():
    if not value:
        missing_vars.append(name)

if missing_vars:
    raise RuntimeError(
        f"Missing required database environment variables: {', '.join(missing_vars)}"
    )

# Encode password safely
DB_PASSWORD = quote_plus(DB_PASSWORD_RAW)

# MySQL connection string (RDS)
DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    echo=False,  # change to True only for debugging
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Base model
Base = declarative_base()

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
