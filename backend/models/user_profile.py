from flask_sqlalchemy import SQLAlchemy
from models import db, BaseModel

class UserProfile(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    favorite_centers = db.Column(db.JSON)  # Stores a list of favorite centers (or could be a string)

    def __repr__(self):
        """Return a string representation of the user profile."""
        return f'<UserProfile {self.username}, Email: {self.email}, Favorite Centers:{self.favorite_centers }>'
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}