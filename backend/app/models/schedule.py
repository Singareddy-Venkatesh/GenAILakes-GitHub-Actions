from sqlalchemy import Column, Integer, ForeignKey, DateTime, ARRAY, String
from app.db.database import Base
from datetime import datetime

class Schedule(Base):
    __tablename__ = "schedule"
    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(Integer, ForeignKey("content.id"), nullable=False)
    platforms = Column(ARRAY(String), nullable=False)
    scheduled_time = Column(DateTime, nullable=False)
