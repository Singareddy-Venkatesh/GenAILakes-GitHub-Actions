from fastapi import APIRouter, HTTPException
from app.utils.database import get_db_connection

router = APIRouter()

@router.get("/leads", response_model=list[dict])
async def get_leads_data():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT EXTRACT(MONTH FROM created_at) AS month, COUNT(*) AS leads
                    FROM social_media_users
                    GROUP BY month
                    ORDER BY month;
                """)
                leads = cur.fetchall()
                return [
                    {"name": int(row[0]), "leads": int(row[1])} for row in leads
                ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching leads data: {str(e)}")
