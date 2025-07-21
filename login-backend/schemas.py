from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class ToggleLikeInput(BaseModel):
    email: EmailStr
    spot_root: str