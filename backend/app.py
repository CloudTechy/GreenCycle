from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to GreenCycle Backend!"

@app.route('/api/facts', strict_slashes=False, methods=['GET'])
def get_facts():
    facts = [
        {
            'id': 1,
            'fact': 'The average person generates over 4 pounds of trash every day and about 1.5 tons of solid waste per year.'
        },
        {
            'id': 2,
            'fact': 'The average American uses 650 pounds of paper per year.'
        },
        {
            'id': 3,
            'fact': 'The average American uses 2,200 gallons of water per day.'
        }
    ]
    return jsonify(facts)

@app.route('/api/centers', strict_slashes=False, methods=['GET'])
def get_centers():
    centers = [
        {
            'id': 1,
            'name': 'Goodwill',
            'address': '1234 Main Street, Houston, TX 77001',
            'city': 'Houston',
            'phone': '123-456-7890',
            'website': 'https://www.goodwill.org'
        },
        {
            'id': 2,
            'name': 'Salvation Army',
            'address': '789 Renew Ln, Renew, TX 77002',
            'city': 'Renew',
            'phone': '098-765-4321',
            'website': 'https://www.salvationarmy.org'
        },
        {
            'id': 3,
            'name': 'Habitat for Humanity',
            'address': '123 Greenway Blvd, Greenville, TX 77003',
            'city': 'Greenville',
            'phone': '456-789-0123',
            'website': 'https://www.habitat.org'
        }
    ]
    return jsonify(centers)

if __name__ == '__main__':
    app.run(debug=True)