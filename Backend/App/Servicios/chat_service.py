from typing import Any

from App.Infraestructura.Repositorios.bases_repo import (
    obtener_base_por_id_y_usuario
)


class BaseConocimientoNoEncontradaError(Exception):
    """La base no existe o no pertenece al usuario autenticado."""


def responder_pregunta(
    id_usuario: int,
    id_base: int,
    pregunta: str
) -> dict[str, Any]:
    """
    Responde una pregunta relacionada con una base de conocimiento.

    En esta primera versión la respuesta es simulada. La interfaz
    pública de esta función se conservará cuando se integre el RAG.
    """

    base = obtener_base_por_id_y_usuario(
        id_base=id_base,
        id_usuario=id_usuario
    )

    if base is None:
        raise BaseConocimientoNoEncontradaError(
            "La base de conocimiento no fue encontrada."
        )

    nombre_base = base["nombre"]

    respuesta = (
        "Recibí tu pregunta y se consultará la base de conocimiento "
        f"{nombre_base}."
    )

    return {
        "respuesta": respuesta,
        "id_base": base["id_base"],
        "nombre_base": nombre_base,
        "fuentes": [],
        "modo": "simulado"
    }