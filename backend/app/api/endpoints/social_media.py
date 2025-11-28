from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.utils.database import get_db_connection
from pydantic import BaseModel

router = APIRouter()

class User(BaseModel):
    platform: str
    name: str
    email: str
    phone: str
    location: str
    priority: str

@router.get("/", response_model=list[User])
async def get_users():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT platform, name, email, phone, location, priority
                    FROM social_media_users;
                """)
                users = cur.fetchall()
                return [
                    {
                        "platform": u[0],
                        "name": u[1],
                        "email": u[2],
                        "phone": u[3],
                        "location": u[4],
                        "priority": u[5],
                    }
                    for u in users
                ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching users: {str(e)}")

@router.post("/", response_model=User)
async def add_user(user: User):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO social_media_users (platform, name, email, phone, location, priority)
                    VALUES (%s, %s, %s, %s, %s, %s);
                    """,
                    (user.platform, user.name, user.email, user.phone, user.location, user.priority)
                )
                conn.commit()
                return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding user: {str(e)}")

@router.get("/{email}", response_model=User)
async def get_user(email: str):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT platform, name, email, phone, location, priority
                    FROM social_media_users WHERE email = %s;
                """, (email,))
                user = cur.fetchone()
                if not user:
                    raise HTTPException(status_code=404, detail="User not found.")
                return {
                    "platform": user[0],
                    "name": user[1],
                    "email": user[2],
                    "phone": user[3],
                    "location": user[4],
                    "priority": user[5],
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching user: {str(e)}")

@router.put("/{email}")
async def update_user(email: str, user: User):
    valid_priorities = ["High", "Medium", "Low"]
    if user.priority not in valid_priorities:
        raise HTTPException(status_code=400, detail="Invalid priority value")

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE social_media_users
                    SET platform = %s, name = %s, email = %s, phone = %s,
                        location = %s, priority = %s
                    WHERE email = %s;
                    """,
                    (user.platform, user.name, user.email, user.phone, user.location, user.priority, email)
                )
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="User not found.")
                conn.commit()
                return {"message": "User updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating user: {str(e)}")

@router.delete("/{email}")
async def delete_user(email: str):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM social_media_users WHERE email = %s;", (email,))
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="User not found.")
                conn.commit()
                return JSONResponse(content={"message": "User deleted successfully."})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting user: {str(e)}")

