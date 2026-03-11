from fastapi_mail import ConnectionConfig

mail_config = ConnectionConfig(
    MAIL_USERNAME="854b39543f2c46",     # your username
    MAIL_PASSWORD="4b022a52b45a52",       # your password
    MAIL_FROM="admin@realestate.com",       # fake email is ok
    MAIL_PORT=587,
    MAIL_SERVER="sandbox.smtp.mailtrap.io",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)

