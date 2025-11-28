from fastapi import APIRouter
from app.utils.ai_integration import get_suggestions

router = APIRouter()

@router.post("/api/suggestions")
def fetch_suggestions(text: str):
    return get_suggestions(text)
