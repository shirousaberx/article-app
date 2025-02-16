import os

DB_USERNAME = "root"
DB_PASSWORD = "root"
DB_HOST = "localhost"
DB_NAME = "posts"
DB_PORT = 3306

SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
SQLALCHEMY_TRACK_MODIFICATIONS = False
