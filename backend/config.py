
import os

class Config:
    # Common configurations
    SECRET_KEY = os.environ.get('SECRET_KEY', 'mysecret')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    # Development-specific configurations
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLITE_URL', 'sqlite:///default.db')

class DevelopmentConfig(Config):
    # Production-specific configurations
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:handsom%40%40@localhost/greencycle')
