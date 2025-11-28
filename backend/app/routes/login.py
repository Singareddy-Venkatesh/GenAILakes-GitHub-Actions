from fastapi import FastAPI, HTTPException, Form, APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(
    prefix="",
    tags=["Authentication"]
)
# Database connection details from environment variables
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "postgres")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "123456")

def get_db_connection():
    try:
        return psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            cursor_factory=RealDictCursor
        )
    except psycopg2.Error as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

async def get_db():
    conn = get_db_connection()
    try:
        yield conn
    finally:
        conn.close()

@router.get("/")
async def root(db: psycopg2.extensions.connection = Depends(get_db)):
    with db.cursor() as cursor:
        cursor.execute("SELECT COUNT(*) FROM register")
        count = cursor.fetchone()['count']
        return {
            "status": "success",
            "message": "FastLeads99 Logindata API is running",
            "total_records": count,
            "endpoints": {
                "/": "Root endpoint",
                "/login": "Login information",
                "/login/all": "Get all user records",
                "/login/{email_id}": "Get specific user record"
            }
        }

@router.post("/login", operation_id="user_login")
async def login(
    emailid: str = Form(...), 
    password: str = Form(...),
    db: psycopg2.extensions.connection = Depends(get_db)
):
    with db.cursor() as cursor:
        try:
            query = """
                SELECT id, username, emailid, pn_number 
                FROM register 
                WHERE emailid = %s AND password = %s
            """
            cursor.execute(query, (emailid, password))
            user = cursor.fetchone()
            
            if user:
                return {
                    "status": "success",
                    "message": "Login successful",
                    "user": {
                        "id": user["id"],
                        "username": user["username"],
                        "email": user["emailid"],
                        "phone": user["pn_number"]
                    }
                }
            raise HTTPException(
                status_code=401,
                detail={
                    "status": "error",
                    "message": "Invalid email or password"
                }
            )
        except psycopg2.Error as e:
            raise HTTPException(status_code=500, detail=str(e))

@router.get("/login/all")
async def get_all_logins(
    limit: Optional[int] = 10,
    offset: Optional[int] = 0,
    db: psycopg2.extensions.connection = Depends(get_db)
):
    with db.cursor() as cursor:
        try:
            query = """
                SELECT id, username, emailid, pn_number 
                FROM register 
                ORDER BY id DESC
                LIMIT %s OFFSET %s
            """
            cursor.execute(query, (limit, offset))
            logins = cursor.fetchall()
            
            cursor.execute("SELECT COUNT(*) FROM register")
            total_count = cursor.fetchone()['count']
            
            return {
                "status": "success",
                "total_records": total_count,
                "count": len(logins),
                "data": logins,
                "pagination": {
                    "limit": limit,
                    "offset": offset,
                    "next_offset": offset + limit if offset + limit < total_count else None
                }
            }
        except psycopg2.Error as e:
            raise HTTPException(status_code=500, detail=str(e))

@router.get("/login/{email_id}")
async def get_login(
    email_id: str,
    db: psycopg2.extensions.connection = Depends(get_db)
):
    with db.cursor() as cursor:
        try:
            query = """
                SELECT id, username, emailid, pn_number
                FROM register 
                WHERE emailid = %s
            """
            cursor.execute(query, (email_id,))
            login = cursor.fetchone()
            
            if not login:
                cursor.execute("SELECT emailid FROM register LIMIT 5")
                available_emails = [row['emailid'] for row in cursor.fetchall()]
                raise HTTPException(
                    status_code=404,
                    detail={
                        "status": "error",
                        "message": f"Login record not found for email: {email_id}",
                        "sample_emails": available_emails
                    }
                )
            
            return {
                "status": "success",
                "message": "Login record retrieved successfully",
                "data": {
                    "id": login["id"],
                    "username": login["username"],
                    "email": login["emailid"],
                    "phone": login["pn_number"]
                }
            }
        except psycopg2.Error as e:
            raise HTTPException(status_code=500, detail=str(e))
            raise HTTPException(status_code=500, detail=str(e))