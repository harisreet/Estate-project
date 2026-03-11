from fastapi import APIRouter, HTTPException, UploadFile, File, Form,Depends
from db import get_connection
from fastapi.staticfiles import StaticFiles
from security import hash_password,verify_password,create_access_token,get_current_admin,get_current_user
router = APIRouter(prefix="/admin/lands", tags=["Land Listings"])

IMAGE_FOLDER = "images/"

@router.get("/")
def get_lands(admin=Depends(get_current_admin)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM land_listings")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data


@router.post("/")
async def add_land(admin=Depends(get_current_admin),
    title: str = Form(...),
    location: str = Form(...),
    price: int = Form(...),
    sqft: int = Form(...),
    land_type: str = Form(...),
    road_access: str = Form(...),
    description: str = Form(...),
    main_image: UploadFile = File(...)
):
    conn = get_connection()
    cursor = conn.cursor()

    image_path = None
    if main_image:
        file_location = IMAGE_FOLDER + main_image.filename
        with open(file_location, "wb+") as f:
            f.write(await main_image.read())
        image_path = "/" + file_location

    sql = """
        INSERT INTO land_listings 
        (title, location, price, sqft, land_type, road_access, description, main_image)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        title, location, price, sqft, land_type, road_access, description, image_path
    )
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Land added successfully"}


@router.put("/{id}")
async def update_land(
    id: int,
    title: str = Form(...),
    location: str = Form(...),
    price: int = Form(...),
    sqft: int = Form(...),
    land_type: str = Form(...),
    road_access: str = Form(...),
    description: str = Form(...),
    main_image: UploadFile = File(None),
    admin=Depends(get_current_admin)
):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM land_listings WHERE id = %s", (id,))
    land = cursor.fetchone()
    if not land:
        raise HTTPException(404, "Land not found")

    new_image = land["main_image"]

    if main_image:
        file_location = IMAGE_FOLDER + main_image.filename
        with open(file_location, "wb+") as f:
            f.write(await main_image.read())
        new_image = "/" + file_location

    sql = """
        UPDATE land_listings SET
        title=%s, location=%s, price=%s, sqft=%s,
        land_type=%s, road_access=%s, description=%s,
        main_image=%s
        WHERE id=%s
    """

    values = (
        title, location, price, sqft,
        land_type, road_access, description,
        new_image, id
    )

    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Land updated successfully"}


@router.delete("/{id}")
def delete_land(id: int,admin=Depends(get_current_admin)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM land_listings WHERE id = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Land deleted successfully"}
