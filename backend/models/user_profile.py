from flask_sqlalchemy import SQLAlchemy
from models import db

class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    favorite_centers = db.Column(db.JSON)  # Stores a list of favorite centers (or could be a string)

    def __repr__(self):
        return f'<UserProfile {self.username}>'
