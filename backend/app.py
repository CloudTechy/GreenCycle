from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from routes import init_routes
from models import db 
from flask_migrate import Migrate
from dotenv import load_dotenv
import os


# Initialize extensions
migrate = Migrate()

def create_app(config_class='config.DevelopmentConfig'):
    # Initialize the Flask app
    app = Flask(__name__)
    
    # Load environment variables from .env file
    load_dotenv()
    
    # Configuration
    app.config.from_object(config_class)
    
    # Initialize CORS
    CORS(app)
    
    # Initialize the database
    db.init_app(app)
    
    # Initialize Migrate
    migrate.init_app(app, db)
    
    # Register Blueprints
    from routes import init_routes
    init_routes(app, prefix='/api')
    
    # Define your routes
    @app.route('/')
    def home():
        return "Welcome to GreenCycle Backend!"
    
    return app
if __name__ == '__main__':
    app = create_app('config.DevelopmentConfig')
    app.run(debug=True)
