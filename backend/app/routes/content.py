from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import models, database
from app.schemas import content

router = APIRouter()

# Create content
@router.post("/content/", response_model=content.ContentResponse)
def create_content(content: content.ContentCreate, db: Session = Depends(database.get_db)):
    db_content = models.Content(**content.dict())
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content

# Get content by ID
@router.get("/content/{content_id}", response_model=content.ContentResponse)
def get_content(content_id: int, db: Session = Depends(database.get_db)):
    db_content = db.query(models.Content).filter(models.Content.id == content_id).first()
    if db_content is None:
        raise HTTPException(status_code=404, detail="Content not found")
    return db_content
