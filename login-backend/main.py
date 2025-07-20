from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base
from crud import get_user_by_email, create_user, verify_login
from pydantic import BaseModel, EmailStr
from schemas import UserCreate

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 또는 ["http://127.0.0.1:5500"] ← 보안 강화용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class LoginInput(BaseModel):
    email: EmailStr
    password: str

@app.post("/login")
def login(data: LoginInput, db: Session = Depends(get_db)):
    user = verify_login(db, data.email, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="로그인 실패")
    return {"message": "로그인 성공", "email": user.email}

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing = get_user_by_email(db, user.email)
    if existing:
        raise HTTPException(status_code=400, detail="이미 존재하는 이메일입니다.")

    create_user(db, user.email, user.password)
    return {"message": "회원가입 성공"}