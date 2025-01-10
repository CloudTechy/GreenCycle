from flask import Blueprint, jsonify, request
from models.recycling_fact import RecyclingFact

facts_bp = Blueprint('facts', __name__)

@facts_bp.route('/facts', strict_slashes=False, methods=['GET'])
def get_facts():
    """Get all recycling facts"""
    facts = RecyclingFact.all()
    facts_list = [fact.to_dict() for fact in facts]
    return jsonify(facts_list)

@facts_bp.route('/facts/<int:fact_id>', strict_slashes=False, methods=['GET'])
def get_fact(fact_id):
    """Get a recycling fact by id"""
    fact = RecyclingFact.find_by_id(fact_id)
    return jsonify(fact.to_dict())

@facts_bp.route('/facts', strict_slashes=False, methods=['POST'])
def create_fact():
    """Create a new recycling fact"""
    fact = request.json.get('fact')
    new_fact = RecyclingFact(fact=fact)
    new_fact.save()

    return jsonify({'message': 'Recycling fact created successfully!', 'fact': {'id': new_fact.id, 'fact': new_fact.fact}})

@facts_bp.route('/facts/<int:fact_id>', strict_slashes=False, methods=['PUT'])
def update_fact(fact_id):
    """Update a recycling fact"""
    fact = RecyclingFact.find_by_id(fact_id)
    fact.fact = request.json.get('fact')
    fact.save()

    return jsonify({'message': 'Recycling fact updated successfully!', 'fact': {'id': fact.id, 'fact': fact.fact}})

@facts_bp.route('/facts/<int:fact_id>', strict_slashes=False, methods=['DELETE'])
def delete_fact(fact_id):
    """Delete a recycling fact"""
    fact = RecyclingFact.find_by_id(fact_id)
    fact.delete()

    return jsonify({'message': 'Recycling fact deleted successfully!', 'fact': {'id': fact.id, 'fact': fact.fact}})