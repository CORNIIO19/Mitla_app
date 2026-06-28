from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from App.Infraestructura.Repositorios.bases_repo import (
    crear_base,
    obtener_bases,
    obtener_base,
    actualizar_base,
    eliminar_base
)


bases_bp = Blueprint("bases", __name__)


@bases_bp.route("/", methods=["POST"])
@jwt_required()
def crear():
    id_usuario = int(get_jwt_identity())
    datos = request.get_json()

    nombre = datos.get("nombre")
    descripcion = datos.get("descripcion", "")

    if not nombre:
        return jsonify({
            "error": "El nombre es obligatorio"
        }), 400

    id_base = crear_base(
        id_usuario,
        nombre,
        descripcion
    )

    return jsonify({
        "mensaje": "Base de conocimiento creada",
        "id_base": id_base
    }), 201


@bases_bp.route("/", methods=["GET"])
@jwt_required()
def listar():
    id_usuario = int(get_jwt_identity())

    bases = obtener_bases(id_usuario)

    return jsonify([
        dict(base)
        for base in bases
    ]), 200


@bases_bp.route("/<int:id_base>", methods=["GET"])
@jwt_required()
def obtener(id_base):
    id_usuario = int(get_jwt_identity())

    base = obtener_base(id_base, id_usuario)

    if not base:
        return jsonify({
            "error": "Base no encontrada"
        }), 404

    return jsonify(dict(base)), 200


@bases_bp.route("/<int:id_base>", methods=["PUT"])
@jwt_required()
def actualizar(id_base):
    id_usuario = int(get_jwt_identity())
    datos = request.get_json()

    filas = actualizar_base(
        id_base,
        id_usuario,
        datos.get("nombre"),
        datos.get("descripcion", "")
    )

    if filas == 0:
        return jsonify({
            "error": "Base no encontrada"
        }), 404

    return jsonify({
        "mensaje": "Base actualizada"
    }), 200


@bases_bp.route("/<int:id_base>", methods=["DELETE"])
@jwt_required()
def eliminar(id_base):
    id_usuario = int(get_jwt_identity())

    filas = eliminar_base(id_base, id_usuario)

    if filas == 0:
        return jsonify({
            "error": "Base no encontrada"
        }), 404

    return jsonify({
        "mensaje": "Base eliminada"
    }), 200