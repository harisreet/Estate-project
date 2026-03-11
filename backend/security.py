
from datetime import datetime, timedelta
import os
from typing import Optional

import jwt  
from passlib.context import CryptContext
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

# password hashing 
pwd_context = CryptContext(schemes=["bcrypt_sha256"], deprecated="auto")
PEPPER = os.getenv("PASSWORD_PEPPER", "")  

def hash_password(plain_password: str) -> str:
    return pwd_context.hash(plain_password + PEPPER)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password + PEPPER, hashed_password)


# JWT settings
JWT_SECRET = os.getenv("JWT_SECRET", "")  
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(subject: str, *, expires_delta: Optional[timedelta] = None, extra: dict = {}):
    now = datetime.utcnow()
    if expires_delta is None:
        expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": subject,
        "iat": now,
        "exp": now + expires_delta,
        **extra
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token


bearer_scheme = HTTPBearer()  

def get_current_admin(credentials: HTTPAuthorizationCredentials = Security(bearer_scheme)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
       
        if not payload.get("is_admin"):
            raise HTTPException(status_code=403, detail="Not authorized as admin")
       
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
def get_current_user(credentials: HTTPAuthorizationCredentials = Security(bearer_scheme)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
       
        if not payload.get("is_user"):
            raise HTTPException(status_code=403, detail="Not authorized as user")
       
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
