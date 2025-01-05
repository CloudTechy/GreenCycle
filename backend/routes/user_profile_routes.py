from flask import Blueprint, request, jsonify
from models.user_profile import UserProfile, db  # Import the model

user_profile_bp = Blueprint('user_profile', __name__)

@user_profile_bp.route('/user_profile', methods=['POST'])
def create_user_profile():
    # Create a new user profile
    username = request.json.get('username')
    email = request.json.get('email')

    new_user = UserProfile(username=username, email=email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User profile created successfully!', 'user': {'id': new_user.id, 'username': new_user.username}})
