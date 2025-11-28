from pydantic import BaseModel, EmailStr

class User(BaseModel):
    platform: str
    name: str
    email: EmailStr
    phone: str
    location: str
    priority: str
