from sqlalchemy import Column, Integer, String, DateTime
from .database import Base

class Content(Base):
    __tablename__ = "content"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    created_at = Column(DateTime)

class Schedule(Base):
    __tablename__ = "schedule"
    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(Integer)
    publish_time = Column(DateTime)

class Analytics(Base):
    __tablename__ = "analytics"
    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(Integer)
    views = Column(Integer)
    shares = Column(Integer)
    likes = Column(Integer)
