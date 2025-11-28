from sqlalchemy import Column, Integer, ForeignKey
from app.db.database import Base

class Analytics(Base):
    __tablename__ = "analytics"
    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(Integer, ForeignKey("content.id"), nullable=False)
    views = Column(Integer, default=0)
    engagement = Column(Integer, default=0)
    shares = Column(Integer, default=0)
