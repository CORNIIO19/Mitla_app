from pathlib import Path
import shutil

from App.config import ALMACENAMIENTO_PATH
from App.Infraestructura.base_datos import get_connection


def normalizar_nombre(nombre):
    return nombre.strip().lower().replace(" ", "_")


def crear_base(id_usuario, nombre, descripcion=""):
    nombre_carpeta = normalizar_nombre(nombre)

    ruta_carpeta = (
        ALMACENAMIENTO_PATH
        / "usuarios"
        / str(id_usuario)
        / "bases"
        / nombre_carpeta
    )

    ruta_carpeta.mkdir(parents=True, exist_ok=True)

    conexion = get_connection()
    cursor = conexion.cursor()

    cursor.execute("""
        INSERT INTO bases_conocimiento (
            id_usuario,
            nombre,
            descripcion,
            ruta_carpeta
        )
        VALUES (?, ?, ?, ?)
    """, (
        id_usuario,
        nombre,
        descripcion,
        str(ruta_carpeta)
    ))

    conexion.commit()
    id_base = cursor.lastrowid
    conexion.close()

    return id_base


def obtener_bases(id_usuario):
    conexion = get_connection()
    cursor = conexion.cursor()

    cursor.execute("""
        SELECT *
        FROM bases_conocimiento
        WHERE id_usuario = ?
        ORDER BY fecha_creacion DESC
    """, (id_usuario,))

    bases = cursor.fetchall()
    conexion.close()

    return bases


def obtener_base(id_base, id_usuario):
    conexion = get_connection()
    cursor = conexion.cursor()

    cursor.execute("""
        SELECT *
        FROM bases_conocimiento
        WHERE id_base = ?
        AND id_usuario = ?
    """, (
        id_base,
        id_usuario
    ))

    base = cursor.fetchone()
    conexion.close()

    return base


def actualizar_base(id_base, id_usuario, nombre, descripcion):
    conexion = get_connection()
    cursor = conexion.cursor()

    cursor.execute("""
        UPDATE bases_conocimiento
        SET nombre = ?,
            descripcion = ?
        WHERE id_base = ?
        AND id_usuario = ?
    """, (
        nombre,
        descripcion,
        id_base,
        id_usuario
    ))

    conexion.commit()
    filas = cursor.rowcount
    conexion.close()

    return filas


def eliminar_base(id_base, id_usuario):
    base = obtener_base(id_base, id_usuario)

    if not base:
        return 0

    ruta = Path(base["ruta_carpeta"])

    conexion = get_connection()
    cursor = conexion.cursor()

    cursor.execute("""
        DELETE FROM bases_conocimiento
        WHERE id_base = ?
        AND id_usuario = ?
    """, (
        id_base,
        id_usuario
    ))

    conexion.commit()
    filas = cursor.rowcount
    conexion.close()

    if ruta.exists():
        shutil.rmtree(ruta)

    return filas

def obtener_base_por_id_y_usuario(id_base: int, id_usuario: int):
    """
    Obtiene una base de conocimiento únicamente cuando pertenece
    al usuario autenticado.

    Devuelve:
        sqlite3.Row si la base existe y pertenece al usuario.
        None si no existe o pertenece a otro usuario.
    """

    conexion = get_connection()

    try:
        cursor = conexion.cursor()

        cursor.execute(
            """
            SELECT
                id_base,
                id_usuario,
                nombre,
                descripcion,
                ruta_carpeta,
                fecha_creacion
            FROM bases_conocimiento
            WHERE id_base = ?
              AND id_usuario = ?
            LIMIT 1
            """,
            (id_base, id_usuario)
        )

        return cursor.fetchone()

    finally:
        conexion.close()