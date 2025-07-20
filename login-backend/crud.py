from sqlalchemy.orm import Session
from models import User
from passlib.hash import bcrypt

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def verify_login(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if user and bcrypt.verify(password, user.password):
        return user
    return None

def create_user(db: Session, email: str, password: str):
    hashed_pw = bcrypt.hash(password)
    new_user = User(email=email, password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user