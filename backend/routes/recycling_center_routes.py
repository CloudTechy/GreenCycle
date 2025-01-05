from flask import Blueprint, jsonify
from models.recycling_center import RecyclingCenter

centers_bp = Blueprint('centers', __name__)

@centers_bp.route('/centers', strict_slashes=False, methods=['GET'])
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
