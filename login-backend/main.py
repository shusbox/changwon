from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, UserLike
from crud import get_user_by_email, create_user, verify_login
from pydantic import BaseModel, EmailStr
from schemas import UserCreate, ToggleLikeInput

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
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

@app.post("/toggle-like")
def toggle_like(data: ToggleLikeInput, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(email=data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

    existing = db.query(UserLike).filter_by(user_id=user.id, spot_root=data.spot_root).first()
    if existing:
        db.delete(existing)
        db.commit()
        return {"liked": False}
    else:
        new_like = UserLike(user_id=user.id, spot_root=data.spot_root)
        db.add(new_like)
        db.commit()
        return {"liked": True}


# 내 좋아요 목록 조회
from models import User  # ensure User is imported

@app.get("/my-likes")
def get_my_likes(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(email=email).first()
    if not user:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

    likes = db.query(UserLike).filter_by(user_id=user.id).all()
    return [like.spot_root for like in likes]