
from fastapi import APIRouter, HTTPException, UploadFile, File, Form,Depends
from db import get_connection
from fastapi.staticfiles import StaticFiles
from security import hash_password,verify_password,create_access_token,get_current_admin,get_current_user
router = APIRouter(prefix="/admin/rentals", tags=["Rentals Listings"])

IMAGE_FOLDER = "images/"


@router.get("/")
def get_rentals(admin=Depends(get_current_admin)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM rental_listings")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data

@router.post("/")
async def add_rental(admin=Depends(get_current_admin),
    title: str = Form(...),
    category: str = Form(...),
    owner_name: str = Form(...),
    owner_phone: str = Form(...),
    location: str = Form(...),
    address: str = Form(...),
    type: str = Form(...),
    rent_amount: float = Form(...),
    deposit_amount: float = Form(0),
    furnishing: str = Form("unfurnished"),
    available_from: str = Form(None),
    amenities: str = Form(None),
    gender: str = Form("any"),
    status: str = Form("available"),
    image_url: UploadFile = File(None)
):
    conn = get_connection()
    cursor = conn.cursor()

    image_path = None
    if image_url:
        file_location = IMAGE_FOLDER + image_url.filename
        with open(file_location, "wb+") as f:
            f.write(await image_url.read())
        image_path = "/" + file_location

    sql = """
        INSERT INTO rental_listings 
        (title, category, owner_name, owner_phone, location, address, type, 
        rent_amount, deposit_amount, furnishing, available_from, amenities, gender, status, image_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        title, category, owner_name, owner_phone, location, address, type,
        rent_amount, deposit_amount, furnishing, available_from, amenities,
        gender, status, image_path
    )

    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Rental added successfully"}

@router.put("/{id}")
async def update_rental(
    id: int,
    title: str = Form(...),
    category: str = Form(...),
    owner_name: str = Form(...),
    owner_phone: str = Form(...),
    location: str = Form(...),
    address: str = Form(...),
    type: str = Form(...),
    rent_amount: float = Form(...),
    deposit_amount: float = Form(...),
    furnishing: str = Form(...),
    available_from: str = Form(None),
    amenities: str = Form(None),
    gender: str = Form(...),
    status: str = Form(...),
    image_url: UploadFile = File(None),
    admin=Depends(get_current_admin)
):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM rental_listings WHERE id=%s", (id,))
    rental = cursor.fetchone()

    if not rental:
        raise HTTPException(404, "Rental not found")

    new_image = rental["image_url"]

    if image_url:
        file_location = UPLOAD_FOLDER + image_url.filename
        with open(file_location, "wb+") as f:
            f.write(await image_url.read())
        new_image = "/" + file_location

    sql = """
        UPDATE rental_listings SET
        title=%s, category=%s, owner_name=%s, owner_phone=%s,
        location=%s, address=%s, type=%s, rent_amount=%s,
        deposit_amount=%s, furnishing=%s, available_from=%s,
        amenities=%s, gender=%s, status=%s, image_url=%s
        WHERE id=%s
    """

    values = (
        title, category, owner_name, owner_phone, location, address, type,
        rent_amount, deposit_amount, furnishing, available_from,
        amenities, gender, status, new_image, id
    )

    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Rental updated successfully"}

@router.delete("/{id}")
def delete_rental(id: int,admin=Depends(get_current_admin)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM rental_listings WHERE id=%s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Rental deleted successfully"}