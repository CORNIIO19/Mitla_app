from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_swagger_ui import get_swaggerui_blueprint


def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = "dev-secret-key"
    app.config["JWT_SECRET_KEY"] = "jwt-secret-key"

    JWTManager(app)
    CORS(app)

    from App.Rutas.Autenticacion import auth_bp
    from App.Rutas.Bases import bases_bp
    from App.Rutas.Archivos import archivos_bp
    from App.Rutas.Chat import chat_bp

    app.register_blueprint(
        auth_bp,
        url_prefix="/api/auth"
    )

    app.register_blueprint(
        bases_bp,
        url_prefix="/api/bases"
    )

    app.register_blueprint(
        archivos_bp,
        url_prefix="/api/archivos"
    )

    app.register_blueprint(
        chat_bp,
        url_prefix="/api/chat"
    )

    URL_SWAGGER = "/docs"
    URL_ESPECIFICACION = "/static/swagger.json"

    swagger_ui = get_swaggerui_blueprint(
        URL_SWAGGER,
        URL_ESPECIFICACION,
        config={
            "app_name": "MITLA API"
        }
    )

    app.register_blueprint(
        swagger_ui,
        url_prefix=URL_SWAGGER
    )

    return app