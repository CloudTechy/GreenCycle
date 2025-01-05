from models import db

class RecyclingFact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fact = db.Column(db.Text, nullable=False)
