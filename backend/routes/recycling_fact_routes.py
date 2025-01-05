from flask import Blueprint, jsonify
from models.recycling_fact import RecyclingFact

facts_bp = Blueprint('facts', __name__)

@facts_bp.route('/facts', strict_slashes=False, methods=['GET'])
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
