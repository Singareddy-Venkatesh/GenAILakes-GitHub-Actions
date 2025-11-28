import psycopg2 as psycopg
from app.core.config import DB_CONFIG

def get_db_connection():
    return psycopg.connect(**DB_CONFIG)
