from pydantic import BaseModel
from datetime import datetime

class ContentCreate(BaseModel):
    title: str
    description: str
    created_at: datetime

class ContentResponse(ContentCreate):
    id: int

    class Config:
        orm_mode = True
