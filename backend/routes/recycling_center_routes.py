from flask import Blueprint, jsonify, request
from models import RecyclingCenter

centers_bp = Blueprint('centers', __name__)

@centers_bp.route('/centers', strict_slashes=False, methods=['GET'])
def get_centers():
    """Get all recycling centers"""
    centers = RecyclingCenter.all()
    centers_list = [center.to_dict() for center in centers]
    return jsonify(centers_list)

@centers_bp.route('/centers/<int:center_id>', strict_slashes=False, methods=['GET'])
def get_center(center_id):
    """Get a recycling center by id"""
    center = RecyclingCenter.find_by_id(center_id)
    return jsonify(center.to_dict())

@centers_bp.route('/centers', strict_slashes=False, methods=['POST'])
def create_center():
    """Create a new recycling center"""
    name = request.json.get('name')
    city = request.json.get('city')
    address = request.json.get('address')
    phone = request.json.get('phone')
    website = request.json.get('website')
    latitude = request.json.get('latitude')
    longitude = request.json.get('longitude')
    new_center = RecyclingCenter(name=name, city=city, address=address, phone=phone, website=website, latitude=latitude, longitude=longitude)
    new_center.save()

    return jsonify({'message': 'Recycling center created successfully!', 'center': {'id': new_center.id, 'name': new_center.name}})

@centers_bp.route('/centers/<int:center_id>', strict_slashes=False, methods=['PUT'])
def update_center(center_id):
    """Update a recycling center"""
    center = RecyclingCenter.find_by_id(center_id)
    center.name = request.json.get('name')
    center.address = request.json.get('address')
    center.city = request.json.get('city')
    center.phone = request.json.get('phone')
    center.website = request.json.get('website')
    center.latitude = request.json.get('latitude')
    center.longitude = request.json.get('longitude')
    center.save()

    return jsonify({'message': 'Recycling center updated successfully!', 'center': {'id': center.id, 'name': center.name}})

@centers_bp.route('/centers/<int:center_id>', strict_slashes=False, methods=['DELETE'])
def delete_center(center_id):
    """Delete a recycling center"""
    center = RecyclingCenter.find_by_id(center_id)
    center.delete()

    return jsonify({'message': 'Recycling center deleted successfully!', 'center': {'id': center.id, 'name': center.name}})
