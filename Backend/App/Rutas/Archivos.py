from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from App.Infraestructura.Repositorios.archivos_repo import (
    subir_archivo,
    obtener_archivos_por_base,
    obtener_archivo,
    eliminar_archivo
)


archivos_bp = Blueprint("archivos", __name__)


@archivos_bp.route("/base/<int:id_base>/subir", methods=["POST"])
@jwt_required()
def subir(id_base):
    id_usuario = int(get_jwt_identity())

    if "archivo" not in request.files:
        return jsonify({
            "error": "No se envió ningún archivo"
        }), 400

    archivo = request.files["archivo"]

    if archivo.filename == "":
        return jsonify({
            "error": "El archivo no tiene nombre"
        }), 400

    id_archivo, error = subir_archivo(
        id_usuario,
        id_base,
        archivo
    )

    if error:
        return jsonify({
            "error": error
        }), 400

    return jsonify({
        "mensaje": "Archivo guardado correctamente",
        "id_archivo": id_archivo
    }), 201


@archivos_bp.route("/base/<int:id_base>", methods=["GET"])
@jwt_required()
def listar_por_base(id_base):
    id_usuario = int(get_jwt_identity())

    archivos = obtener_archivos_por_base(
        id_usuario,
        id_base
    )

    return jsonify([
        dict(archivo)
        for archivo in archivos
    ]), 200


@archivos_bp.route("/<int:id_archivo>", methods=["GET"])
@jwt_required()
def obtener(id_archivo):
    id_usuario = int(get_jwt_identity())

    archivo = obtener_archivo(
        id_usuario,
        id_archivo
    )

    if not archivo:
        return jsonify({
            "error": "Archivo no encontrado"
        }), 404

    return jsonify(dict(archivo)), 200


@archivos_bp.route("/<int:id_archivo>", methods=["DELETE"])
@jwt_required()
def eliminar(id_archivo):
    id_usuario = int(get_jwt_identity())

    filas = eliminar_archivo(
        id_usuario,
        id_archivo
    )

    if filas == 0:
        return jsonify({
            "error": "Archivo no encontrado"
        }), 404

    return jsonify({
        "mensaje": "Archivo eliminado correctamente"
    }), 200