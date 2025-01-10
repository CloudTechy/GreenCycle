from flask import Blueprint

def init_routes(app, prefix='/api'):
    """Initialize and register all the Blueprints"""
    # Import Blueprints inside the function to avoid circular import issues
    from routes.recycling_fact_routes import facts_bp
    from routes.recycling_center_routes import centers_bp
    from routes.user_profile_routes import user_profile_bp
    # Register Blueprints
    app.register_blueprint(facts_bp, url_prefix=prefix)
    app.register_blueprint(centers_bp, url_prefix=prefix)
    app.register_blueprint(user_profile_bp, url_prefix=prefix)
