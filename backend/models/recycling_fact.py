from models import db, BaseModel

class RecyclingFact(BaseModel):
    """Data model for recycling fact."""
    __tablename__ = 'recycling_fact'
    id = db.Column(db.Integer, primary_key=True)
    fact = db.Column(db.Text, nullable=False)

    def __repr__(self):
        """Return a string representation of the recycling fact."""
        return f'<RecyclingFact {self.id}, fact:{self.fact}>'
    def to_dict(self):
        """Return a dictionary representation of the recycling fact."""
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}