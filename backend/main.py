from fastapi import FastAPI,HTTPException,UploadFile, File, Form,Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from db import get_connection
from security import hash_password,verify_password,create_access_token,get_current_admin,get_current_user
from routers import land,auth,rental,contact_ai
from typing import Union
import os
import joblib
import numpy as np
# load_dotenv()
UPLOAD_FOLDER="uploads"
app = FastAPI()

app.include_router(land.router)
app.include_router(auth.router)
app.include_router(rental.router)
app.include_router(contact_ai.router)


IMAGE_FOLDER="images/"
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/images", StaticFiles(directory="images"), name="images")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/projects")
def get_projects(user=Depends(get_current_user)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM properties")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.get("/projects/complete")
def get_projects():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM properties")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.post("/admin/houses")
async def add_house(admin=Depends(get_current_admin),
    title: str = Form(...),
    price: int = Form(...),
    location: str = Form(...),
    category: str = Form(...),
    image: UploadFile = File(...)
):
    with open(f"{UPLOAD_FOLDER}/{image.filename}", "wb") as f:
        f.write(await image.read())

    conn = get_connection()
    cursor = conn.cursor(prepared=True)
    query = "INSERT INTO properties (title, price, category, location, image_path) VALUES (?, ?, ?, ?, ?)"
    cursor.execute(query, (title, price, category, location, image.filename))
    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "House added", "image": image.filename}


@app.get("/admin/houses")
def get_houses(admin=Depends(get_current_admin)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM properties")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.get("/admin/projects")
def get_projects(admin=Depends(get_current_admin)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM properties")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows


@app.put("/admin/houses/{house_id}")
async def update_house(      
    house_id: int,
    title: str = Form(...),
    price: int = Form(...),
    category: str = Form(...),
    location: str = Form(...),
    image: UploadFile = File(None) ,
    admin=Depends(get_current_admin)
):
    conn = get_connection()
    cursor = conn.cursor(prepared=True)

    if image:
        file_path = f"{UPLOAD_FOLDER}/{image.filename}"
        with open(file_path, "wb") as f:
            f.write(await image.read())
        query = "UPDATE properties SET title=?, price=?, category=?, location=?, image_path=? WHERE pid=?"
        data = (title, price, category, location, image.filename, house_id)
    else:
        query = "UPDATE properties SET title=?, price=?, category=?, location=? WHERE pid=?"
        data = (title, price, category, location, house_id)

    cursor.execute(query, data)
    conn.commit()
    if cursor.rowcount == 0:
        raise HTTPException(404, "House not found")

    cursor.close()
    conn.close()
    return {"message": "House updated"}



@app.delete("/admin/houses/{house_id}")
def delete_house(house_id: int,admin=Depends(get_current_admin)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT image_path FROM properties WHERE pid = %s", (house_id,))
    row = cursor.fetchone()
    
    if not row:
        cursor.close()
        conn.close()
        raise HTTPException(404, "House not found")
    
    image_path = f"{UPLOAD_FOLDER}/{row['image_path']}"
    cursor.execute("DELETE FROM properties WHERE pid = %s", (house_id,))
    conn.commit()
    cursor.close()
    conn.close()
    if image_path and os.path.exists(image_path):
        os.remove(image_path)

    return {"message": "House and image deleted successfully"}


@app.get("/rental")
def get_rental(user=Depends(get_current_user)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM rental_listings")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.get("/rental/{id}")
def get_particular(id:int,user=Depends(get_current_user)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM rental_listings WHERE id=%s",(id,))
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    return row


@app.get("/image/{id}")
def get_images(id:int,user=Depends(get_current_user)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM rental_images WHERE listing_id=%s",(id,))
    row = cursor.fetchall()
    cursor.close()
    conn.close()
    return row


@app.get("/selling/projects")
def get_sell_projects(user=Depends(get_current_user)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM selling_properties")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.get("/land")
def get_sell_projects(user=Depends(get_current_user)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM land_listings")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

class Contact(BaseModel):
    name:str
    email:str
    phone:str
    message:str

@app.post("/contact")
def fetch_contact(datas:Contact):
    conn=get_connection()
    cursor=conn.cursor()
    cursor.execute(
        "INSERT INTO user_contact(name,email,phone,message) VALUES(%s,%s,%s,%s)",
        (datas.name,datas.email,datas.phone,datas.message))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Contact added"}


# # Load your trained model
# model = joblib.load("models/price_model.pkl")

# # Load all LabelEncoders from single PKL
# encoders = joblib.load("models/encoders.pkl")

# class price(BaseModel):
#     area: int
#     bhk: int
#     bathroom: int
#     furnishing: Union[str,int]
#     status: Union[str,int]
#     parking: int
#     property_type: Union[str,int]
#     transaction: Union[str,int]
#     area_type: Union[str,int]
#     tenant_preferred: Union[str,int]
#     current_floor : int
#     total_floors : int
#     type :Union[str,int]

# @app.post("/price/predict")
# def price_predict(datas:price):
#     cat_columns = [
#         "furnishing", "status", "property_type",
#         "transaction", "area_type", "tenant_preferred", "type"
#     ]
    
#     X_input = [
#         datas.area,
#         datas.bhk,
#         datas.bathroom,
#         encoders["furnishing"].transform([datas.furnishing])[0],
#         encoders["status"].transform([datas.status])[0],
#         datas.parking,
#         encoders["property_type"].transform([datas.property_type])[0],
#         encoders["transaction"].transform([datas.transaction])[0],
#         encoders["area_type"].transform([datas.area_type])[0],
#         encoders["tenant_preferred"].transform([datas.tenant_preferred])[0],
#         datas.current_floor,
#         datas.total_floors,
#         encoders["type"].transform([datas.type])[0]
#     ]

   
#     predicted_price = model.predict([X_input])
#     predicted_price = float(np.expm1(predicted_price_log))

#     return {"predicted_price": float(predicted_price)}

model = joblib.load("models/rent_model.pkl") 
encoders = joblib.load("models/encoders2.pkl")
class RentPrice(BaseModel):
    area: int
    bhk: int
    bathroom: int
    furnishing: str
    area_type: str
    tenant_preferred: str
    current_floor: int
    total_floors: int

@app.post("/price/predict")
def price_predict(datas: RentPrice):
    floor_ratio = datas.current_floor / (datas.total_floors + 1)
    is_high_floor = 1 if datas.current_floor > (datas.total_floors * 0.5) else 0
    bathroom_per_bhk = datas.bathroom / (datas.bhk if datas.bhk > 0 else 1)
    bhk_per_sqft = datas.bhk / (datas.area if datas.area > 0 else 1)
    X_input = [
        datas.area,
        datas.bhk,
        datas.bathroom,
        datas.current_floor,
        datas.total_floors,
        floor_ratio,
        is_high_floor,
        bathroom_per_bhk,
        bhk_per_sqft,
        encoders["furnishing"].transform([datas.furnishing])[0],
        encoders["area_type"].transform([datas.area_type])[0],
        encoders["tenant_preferred"].transform([datas.tenant_preferred])[0]
    ]
    predicted = model.predict([X_input])

    return {"predicted_price": float(predicted)}


    

    

