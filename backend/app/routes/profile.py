from fastapi import APIRouter, HTTPException, Depends, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict

router = APIRouter()

# Database connection details
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASSWORD = "123456"

# Helper function to connect to PostgreSQL
def get_db_connection():
     return psycopg2.connect(
         host=DB_HOST,
         port=DB_PORT,
         database=DB_NAME,
         user=DB_USER,
         password=DB_PASSWORD,
         cursor_factory=RealDictCursor,
     )
 
class UserData(BaseModel):
     username: str
     emailid: str
     pn_number: str
     password: str


@router.post("/register")
async def register(user_data: UserData):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # First get the maximum ID
        cursor.execute("SELECT MAX(id) FROM register")
        max_id = cursor.fetchone()['max']
        
        # Set next ID as 1 if table is empty, otherwise increment by 1
        next_id = 1 if max_id is None else max_id + 1
        
        # Modified insert query to include ID
        query = """
            INSERT INTO register (id, username, emailid, pn_number, password) 
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(query, (next_id, user_data.username, user_data.emailid, 
                             user_data.pn_number, user_data.password))
        
        conn.commit()
        cursor.close()
        conn.close()

        return JSONResponse(content={"message": "User registered successfully"})
    except psycopg2.IntegrityError as e:
        if "unique constraint" in str(e).lower():
            raise HTTPException(status_code=400, detail="Credentials already exists")
        raise HTTPException(status_code=400, detail="Registration failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login", operation_id="profile_login") 
async def login(email: str = Form(...), password: str = Form(...)):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # First, let's verify if the email exists and get the user data
        query = "SELECT * FROM register WHERE emailid = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        if user:
            # Convert the user record to a dictionary
            user_dict = dict(user)
            
            # Check if password matches
            if user_dict['password'] == password:
                return {
                    "message": "Login successful",
                    "status": "success",
                    "user": user_dict
                }
        
        return JSONResponse(
            status_code=401,
            content={
                "message": "Invalid email or password",
                "status": "error"
            }
        )

    finally:
        cursor.close()
        conn.close()

@router.get("/profile")
async def get_profile():
     try:
         # Connect to the database
         conn = get_db_connection()
         cursor = conn.cursor()

         # Query to fetch all users from the database
         query = "SELECT * FROM register"
         cursor.execute(query)
         users = cursor.fetchall()

         # Close the connection
         cursor.close()
         conn.close()

         return {
             "status": "success",
             "data": users
         }

     except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))