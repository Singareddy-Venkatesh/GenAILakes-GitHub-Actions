from fastapi import APIRouter, HTTPException
from app.utils.database import get_db_connection

router = APIRouter()

@router.get("/analytics/priorities", response_model=list[dict])
# In your app/api/endpoints/leads.py
async def get_priorities_data():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Adjust your query as needed to calculate the percentage of priorities
                cur.execute("""
                    SELECT priority, COUNT(*)::float / SUM(COUNT(*)) OVER () * 100 AS percentage
                    FROM social_media_users
                    GROUP BY priority;
                """)
                priorities = cur.fetchall()
                
                # Mapping of priority to colors
                color_mapping = {"High": "#ef4444", "Medium": "#f59e0b", "Low": "#10b981"}

                # Returning the priorities with colors
                return [
                    {
                        "name": row[0],
                        "value": round(row[1], 2),
                        "color": color_mapping.get(row[0], "#000000")
                    } for row in priorities
                ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching priorities data: {str(e)}")

