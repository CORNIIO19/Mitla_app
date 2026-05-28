from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from App.Infraestructura.Repositorios.usuarios_repo import (
    create_user,
    get_user_by_email
)

from App.Seguridad.Passwords import (
    hash_password,
    check_password
)


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    nombre = data.get("nombre")
    email = data.get("email")
    telefono = data.get("telefono")
    password = data.get("password")

    if not nombre or not email or not password:
        return jsonify({
            "error": "Nombre, email y password son obligatorios"
        }), 400

    if get_user_by_email(email):
        return jsonify({
            "error": "El email ya está registrado"
        }), 409

    id_usuario = create_user(
        nombre,
        email,
        telefono,
        hash_password(password)
    )

    return jsonify({
        "message": "Usuario registrado correctamente",
        "id_usuario": id_usuario
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    usuario = get_user_by_email(email)

    if not usuario:
        return jsonify({
            "error": "Credenciales inválidas"
        }), 401

    if not check_password(password, usuario["password_hash"]):
        return jsonify({
            "error": "Credenciales inválidas"
        }), 401

    token = create_access_token(
        identity=str(usuario["id_usuario"])
    )

    return jsonify({
        "message": "Login correcto",
        "access_token": token,
        "usuario": {
            "id_usuario": usuario["id_usuario"],
            "nombre": usuario["nombre"],
            "email": usuario["email"]
        }
    }), 200