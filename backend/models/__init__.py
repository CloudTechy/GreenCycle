# backend/models/__init__.py

from flask_sqlalchemy import SQLAlchemy

# Initialize db object here
db = SQLAlchemy()
from models.BaseModel import BaseModel
from models.recycling_fact import RecyclingFact
from models.recycling_center import RecyclingCenter
from models.user_profile import UserProfile