from pathlib import Path

from App.config import STORAGE_PATH
from App.Infraestructura.base_datos import get_connection


def create_note_file(id_usuario, titulo, contenido):
    user_notes_path = STORAGE_PATH / "users" / str(id_usuario) / "notes"
    user_notes_path.mkdir(parents=True, exist_ok=True)

    safe_title = titulo.lower().replace(" ", "_")
    file_path = user_notes_path / f"{safe_title}.md"

    with open(file_path, "w", encoding="utf-8") as file:
        file.write(contenido or "")

    return str(file_path)


def create_note(id_usuario, titulo, contenido, visibilidad="privada", id_carpeta=None):
    ruta_archivo = create_note_file(id_usuario, titulo, contenido)

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO notas (
            id_usuario,
            id_carpeta,
            titulo,
            contenido,
            formato,
            ruta_archivo,
            fecha_actualizacion,
            visibilidad
        )
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
    """, (
        id_usuario,
        id_carpeta,
        titulo,
        contenido,
        "md",
        ruta_archivo,
        visibilidad
    ))

    connection.commit()
    id_nota = cursor.lastrowid
    connection.close()

    return id_nota


def get_notes_by_user(id_usuario):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM notas
        WHERE id_usuario = ?
        ORDER BY fecha_creacion DESC
    """, (id_usuario,))

    notas = cursor.fetchall()
    connection.close()

    return notas


def get_note_by_id(id_nota, id_usuario):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM notas
        WHERE id_nota = ?
        AND id_usuario = ?
    """, (
        id_nota,
        id_usuario
    ))

    nota = cursor.fetchone()
    connection.close()

    return nota


def update_note(id_nota, id_usuario, titulo, contenido, visibilidad):
    nota = get_note_by_id(id_nota, id_usuario)

    if not nota:
        return 0

    if nota["ruta_archivo"]:
        path = Path(nota["ruta_archivo"])

        if path.exists():
            with open(path, "w", encoding="utf-8") as file:
                file.write(contenido or "")

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        UPDATE notas
        SET titulo = ?,
            contenido = ?,
            visibilidad = ?,
            fecha_actualizacion = CURRENT_TIMESTAMP
        WHERE id_nota = ?
        AND id_usuario = ?
    """, (
        titulo,
        contenido,
        visibilidad,
        id_nota,
        id_usuario
    ))

    connection.commit()
    rows = cursor.rowcount
    connection.close()

    return rows


def delete_note(id_nota, id_usuario):
    nota = get_note_by_id(id_nota, id_usuario)

    if not nota:
        return 0

    if nota["ruta_archivo"]:
        path = Path(nota["ruta_archivo"])

        if path.exists():
            path.unlink()

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        DELETE FROM notas
        WHERE id_nota = ?
        AND id_usuario = ?
    """, (
        id_nota,
        id_usuario
    ))

    connection.commit()
    rows = cursor.rowcount
    connection.close()

    return rows