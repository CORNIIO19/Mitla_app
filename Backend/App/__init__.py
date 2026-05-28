from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint


def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = "dev-secret-key"
    app.config["JWT_SECRET_KEY"] = "jwt-secret-key"

    JWTManager(app)
    CORS(app)

    from App.Rutas.Autenticacion import auth_bp
    from App.Rutas.Notas import note_bp
    from App.Rutas.Bases import base_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(note_bp, url_prefix="/api/notas")
    app.register_blueprint(base_bp, url_prefix="/api/bases")

    SWAGGER_URL = "/docs"
    API_URL = "/static/swagger.json"

    swagger_ui = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            "app_name": "Gestor Inteligente de Notas API"
        }
    )

    app.register_blueprint(swagger_ui, url_prefix=SWAGGER_URL)


    return app
