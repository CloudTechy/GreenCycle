from flask import current_app
 
from models import db

class BaseModel(db.Model):
    """Base data model for all objects"""
    __abstract__ = True

    # Helper function to ensure app context is available
    @staticmethod
    def get_app_context():
        from app import create_app 
        if not current_app or not hasattr(current_app, 'app_context'):
            app = create_app()  
            app.app_context().push()  

    # Save (create or update)
    def save(self):
        self.get_app_context()
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    # Delete
    def delete(self):
        self.get_app_context()
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    # Find by ID
    @classmethod
    def find_by_id(cls, record_id):
        cls.get_app_context()
        return cls.query.get(record_id)

    # Find all
    @classmethod
    def all(cls):
        cls.get_app_context()
        return cls.query.all()

    # Update attributes
    def update(self, **kwargs):
        self.get_app_context()
        try:
            for key, value in kwargs.items():
                if hasattr(self, key):
                    setattr(self, key, value)
            self.save()
        except Exception as e:
            db.session.rollback()
            raise e
