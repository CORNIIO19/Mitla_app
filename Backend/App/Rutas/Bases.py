from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from App.Infraestructura.Repositorios.bases_repo import (
    create_base,
    get_bases_by_user,
    add_note_to_base
)


base_bp = Blueprint("bases", __name__)


@base_bp.route("/", methods=["GET"])
@jwt_required()
def obtener_bases():
    id_usuario = int(get_jwt_identity())

    bases = get_bases_by_user(id_usuario)

    return jsonify([
        dict(base)
        for base in bases
    ]), 200


@base_bp.route("/", methods=["POST"])
@jwt_required()
def crear_base():
    id_usuario = int(get_jwt_identity())

    data = request.get_json()

    nombre = data.get("nombre")
    descripcion = data.get("descripcion")
    privacidad = data.get("privacidad", "privada")

    if not nombre:
        return jsonify({
            "error": "El nombre es obligatorio"
        }), 400

    id_base = create_base(
        id_usuario,
        nombre,
        descripcion,
        privacidad
    )

    return jsonify({
        "message": "Base creada correctamente",
        "id_base": id_base
    }), 201


@base_bp.route("/<int:id_base>/notas", methods=["POST"])
@jwt_required()
def agregar_nota(id_base):
    data = request.get_json()

    id_nota = data.get("id_nota")

    if not id_nota:
        return jsonify({
            "error": "id_nota es obligatorio"
        }), 400

    add_note_to_base(id_base, id_nota)

    return jsonify({
        "message": "Nota agregada a la base"
    }), 200