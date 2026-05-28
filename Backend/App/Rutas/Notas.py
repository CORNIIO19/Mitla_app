from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from App.Infraestructura.Repositorios.notas_repo import (
    create_note,
    get_notes_by_user,
    get_note_by_id,
    update_note,
    delete_note
)


note_bp = Blueprint("notas", __name__)


@note_bp.route("/", methods=["GET"])
@jwt_required()
def obtener_notas():
    id_usuario = int(get_jwt_identity())

    notas = get_notes_by_user(id_usuario)

    return jsonify([
        dict(nota)
        for nota in notas
    ]), 200


@note_bp.route("/", methods=["POST"])
@jwt_required()
def crear_nota():
    id_usuario = int(get_jwt_identity())

    data = request.get_json()

    titulo = data.get("titulo")
    contenido = data.get("contenido", "")
    visibilidad = data.get("visibilidad", "privada")

    if not titulo:
        return jsonify({
            "error": "El título es obligatorio"
        }), 400

    id_nota = create_note(
        id_usuario,
        titulo,
        contenido,
        visibilidad
    )

    return jsonify({
        "message": "Nota creada correctamente",
        "id_nota": id_nota
    }), 201


@note_bp.route("/<int:id_nota>", methods=["GET"])
@jwt_required()
def obtener_nota(id_nota):
    id_usuario = int(get_jwt_identity())

    nota = get_note_by_id(id_nota, id_usuario)

    if not nota:
        return jsonify({
            "error": "Nota no encontrada"
        }), 404

    return jsonify(dict(nota)), 200


@note_bp.route("/<int:id_nota>", methods=["PUT"])
@jwt_required()
def editar_nota(id_nota):
    id_usuario = int(get_jwt_identity())

    data = request.get_json()

    rows = update_note(
        id_nota,
        id_usuario,
        data.get("titulo"),
        data.get("contenido"),
        data.get("visibilidad", "privada")
    )

    if rows == 0:
        return jsonify({
            "error": "Nota no encontrada"
        }), 404

    return jsonify({
        "message": "Nota actualizada correctamente"
    }), 200


@note_bp.route("/<int:id_nota>", methods=["DELETE"])
@jwt_required()
def borrar_nota(id_nota):
    id_usuario = int(get_jwt_identity())

    rows = delete_note(id_nota, id_usuario)

    if rows == 0:
        return jsonify({
            "error": "Nota no encontrada"
        }), 404

    return jsonify({
        "message": "Nota eliminada correctamente"
    }), 200