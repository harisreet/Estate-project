from db import get_connection
from pydantic import BaseModel
from fastapi import FastAPI,HTTPException, APIRouter
from google.oauth2 import id_token
from google.auth.transport import requests
from dotenv import load_dotenv

from security import hash_password,verify_password,create_access_token,get_current_admin,get_current_user
import os
load_dotenv()
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

router = APIRouter(prefix="/auth", tags=["authorization"])


class GoogleToken(BaseModel):
    token: str

class EmailLogin(BaseModel):
    email:str
    password:str
#google
@router.post("/google")
def google_auth(payload: GoogleToken):
    try:
        CLIENT_ID = GOOGLE_CLIENT_ID
        id_info = id_token.verify_oauth2_token(
            payload.token,
            requests.Request(),
            CLIENT_ID
        )
        email = id_info["email"]
        name = id_info.get("name", "")
        google_id = id_info["sub"]
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM user WHERE email=%s", (email,))
        user = cursor.fetchone()
        if not user:
            cursor.execute(
                "INSERT INTO user (email, name, google_id) VALUES (%s, %s, %s)",
                (email, name, google_id))
            conn.commit()
            cursor.execute("SELECT * FROM user WHERE email=%s", (email,))
            user = cursor.fetchone()
        cursor.close()
        conn.close()
        token = create_access_token(
            subject=str(user["uid"]),
            extra={"is_user": True, "email": user["email"]})
        return {"status": "success","access_token": token,"token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    
#login
@router.post("/login")
def check_users(person:EmailLogin):
    conn=get_connection()
    cursor=conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user where email=%s",(person.email,))
    row=cursor.fetchone()
    if not row:
        raise HTTPException(status_code=404,detail="user_not_found")
    if not verify_password(person.password,row["password"]):
        raise HTTPException(status_code=401,detail="wrong password")
    if row:
        token = create_access_token(subject=str(row["uid"]), extra={"is_user": True, "email": row["email"]})
        return {"status": "success","access_token": token, "token_type": "bearer"}

#signup
@router.post("/signup")
def check_users(person:EmailLogin):
    conn=get_connection()
    cursor=conn.cursor()
    cursor.execute("SELECT * FROM user where email=%s",(person.email,))
    row=cursor.fetchone()
    if row:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=400, detail="User already exists")
    cursor.execute("INSERT INTO user (email,password) VALUES(%s,%s)",(person.email,hash_password(person.password)))
    conn.commit()
    cursor.close()
    conn.close()
    return {"status":"success"}

#admin login
@router.post("/admin/login")
def admin(person:EmailLogin):
    conn=get_connection()
    cursor=conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM admin where email=%s AND password=%s",(person.email,person.password))
    row=cursor.fetchone()
    if not row:
        raise HTTPException(status_code=404,detail="user_not_found")
    token = create_access_token(subject=str(row["aid"]), extra={"is_admin": True, "email": row["email"]})

    return {"status": "success","access_token": token, "token_type": "bearer"}