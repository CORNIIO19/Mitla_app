from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from App.Servicios.chat_service import (
    BaseConocimientoNoEncontradaError,
    responder_pregunta
)


chat_bp = Blueprint("chat", __name__)

LIMITE_PREGUNTA = 4000


@chat_bp.route("/preguntar", methods=["POST"])
@jwt_required()
def preguntar():
    """
    Recibe una pregunta relacionada con una base de conocimiento
    perteneciente al usuario autenticado.
    """

    try:
        datos = request.get_json(silent=True)

        if datos is None or not isinstance(datos, dict):
            return jsonify({
                "error": "El cuerpo de la petición debe ser un JSON válido."
            }), 400

        if "id_base" not in datos:
            return jsonify({
                "error": "El campo id_base es obligatorio."
            }), 400

        if "pregunta" not in datos:
            return jsonify({
                "error": "El campo pregunta es obligatorio."
            }), 400

        id_base = datos["id_base"]
        pregunta = datos["pregunta"]

        # bool hereda de int en Python, por eso se excluye explícitamente.
        if not isinstance(id_base, int) or isinstance(id_base, bool):
            return jsonify({
                "error": "El campo id_base debe ser un entero válido."
            }), 400

        if id_base <= 0:
            return jsonify({
                "error": "El campo id_base debe ser mayor que cero."
            }), 400

        if not isinstance(pregunta, str):
            return jsonify({
                "error": "El campo pregunta debe ser una cadena de texto."
            }), 400

        pregunta_limpia = pregunta.strip()

        if not pregunta_limpia:
            return jsonify({
                "error": "La pregunta no puede estar vacía."
            }), 400

        if len(pregunta_limpia) > LIMITE_PREGUNTA:
            return jsonify({
                "error": (
                    f"La pregunta no puede superar "
                    f"{LIMITE_PREGUNTA} caracteres."
                )
            }), 400

        id_usuario = int(get_jwt_identity())

        resultado = responder_pregunta(
            id_usuario=id_usuario,
            id_base=id_base,
            pregunta=pregunta_limpia
        )

        return jsonify(resultado), 200

    except BaseConocimientoNoEncontradaError:
        return jsonify({
            "error": "La base de conocimiento no fue encontrada."
        }), 404

    except (TypeError, ValueError):
        return jsonify({
            "error": "La identidad del usuario autenticado no es válida."
        }), 401

    except Exception:
        current_app.logger.exception(
            "Error inesperado al procesar una pregunta del chat."
        )

        return jsonify({
            "error": "Ocurrió un error interno al procesar la solicitud."
        }), 500