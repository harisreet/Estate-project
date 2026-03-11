import mysql.connector;

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="3135hari@03",
        database="estate"
    )