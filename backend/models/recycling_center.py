from models import BaseModel, db

class RecyclingCenter(BaseModel):
    """Data model for recycling center."""
    __tablename__ = 'recycling_center'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    website = db.Column(db.String(100), nullable=True)
    likes = db.Column(db.Integer, nullable=True, default=0)

    def __repr__(self):
        """Return a string representation of the recycling center."""
        return f'<RecyclingCenter {self.name}, Address: {self.address}, Phone: {self.phone}, Likes: {self.likes}>'

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}