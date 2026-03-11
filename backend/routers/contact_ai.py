from fastapi import APIRouter, Form
from fastapi_mail import FastMail, MessageSchema
from email_config import mail_config
from pydantic import BaseModel
from ai_reply import generate_property_submission_reply
import asyncio
router = APIRouter()
fm = FastMail(mail_config)
class Contact(BaseModel):
    name:str
    email:str
    phone:str
    message:str

@router.post("/contact-admin")
async def contact_admin(datas:Contact):
    
    auto_reply = generate_property_submission_reply(datas.name)

    reply_message = MessageSchema(
        subject="Property Submission Instructions",
        recipients=[datas.email],
        body=auto_reply,
        subtype="plain",
    )

    await fm.send_message(reply_message)


    admin_message = MessageSchema(
        subject="New Property Contact",
        recipients=["admin@gmail.com"],  
        body=f"Name: {datas.name}\nEmail: {datas.email}\n\nMessage:\n{datas.message}",
        subtype="plain",
    )
    await asyncio.sleep(5)
    await fm.send_message(admin_message)

    return {"message": "Contact received. Auto-reply sent."}
