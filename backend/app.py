from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from routes.routes import init_routes
from models import db 


app = Flask(__name__)
CORS(app)
# Database URI configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:handsom@@@localhost/greencycle'
db.init_app(app)

# Register Blueprints
init_routes(app, prefix='/api')

@app.route('/')
def home():
    return "Welcome to GreenCycle Backend!"

if __name__ == '__main__':
    app.run(debug=True)