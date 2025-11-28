from sqlalchemy import Column, Integer, String, Enum, JSON, DateTime
from app.db.database import Base
from datetime import datetime
from enum import Enum as PyEnum

class ContentType(PyEnum):
    TEXT = "text"
    VIDEO = "video"
    BLOG = "blog"
    REEL = "reel"

class Content(Base):
    __tablename__ = "content"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(ContentType), nullable=False)
    data = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
