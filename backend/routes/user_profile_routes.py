from flask import Blueprint, request, jsonify
from models.user_profile import UserProfile, db 
from flask_bcrypt import Bcrypt as bcrypt

user_profile_bp = Blueprint('user_profile', __name__)

@user_profile_bp.route('/user_profile', methods=['POST'])
def create_user_profile():
    """Create a new user profile"""
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    new_user = UserProfile(username=username, email=email, password=bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'))
    new_user.save()

    return jsonify({'message': 'User profile created successfully!', 'user': {'id': new_user.id, 'username': new_user.username}})

@user_profile_bp.route('/user_profile/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    """Get a user profile by id"""
    user = UserProfile.get(user_id)
    return jsonify(user.to_dict())

@user_profile_bp.route('/user_profile/<int:user_id>', methods=['PUT'])
def update_user_profile(user_id):
    """Update a user profile"""
    user = UserProfile.get(user_id)
    user.username = request.json.get('username')
    user.email = request.json.get('email')
    user.password = bcrypt.hashpw(request.json.get('password').encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user.save()

    return jsonify({'message': 'User profile updated successfully!', 'user': {'id': user.id, 'username': user.username}}) 

@user_profile_bp.route('/user_profile/<int:user_id>', methods=['DELETE'])
def delete_user_profile(user_id):
    """Delete a user profile"""
    user = UserProfile.get(user_id)
    user.delete()

    return jsonify({'message': 'User profile deleted successfully!', 'user': {'id': user.id, 'username': user.username}})

