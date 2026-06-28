from pathlib import Path

from werkzeug.utils import secure_filename

from App.Infraestructura.base_datos import get_connection
from App.Infraestructura.Repositorios.bases_repo import obtener_base
from App.Infraestructura.Strategy_archivos.fabrica import (
    obtener_estrategia,
    obtener_extension
)


def subir_archivo(id_usuario, id_base, archivo):
    base = obtener_base(id_base, id_usuario)

    if not base:
        return None, "Base de conocimiento no encontrada"

    estrategia = obtener_estrategia(archivo.filename)

    if not estrategia:
        return None, "Tipo de archivo no soportado"

    if not estrategia.validar(archivo):
        return None, "Archivo inválido"

    nombre_seguro = secure_filename(archivo.filename)
    extension = obtener_extension(nombre_seguro)

    ruta_base = Path(base["ruta_carpeta"])
    ruta_base.mkdir(parents=True, exist_ok=True)

    ruta_archivo = ruta_base / nombre_seguro

    archivo.save(ruta_archivo)

    contenido_extraido = estrategia.extraer_contenido(ruta_archivo)

    titulo = Path(nombre_seguro).stem

    conexion = get_connection()
    cursor = conexion.cursor()

    cursor.execute("""
        INSERT INTO archivos (
            id_base,
            id_usuario,
            titulo,
            nombre_archivo,
            extension,
            mime_type,
            ruta_archivo,
            contenido_extraido,
            procesado
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        id_base,
        id_usuario,
        titulo,
        nombre_seguro,
        extension,
        archivo.mimetype,
        str(ruta_archivo),
        contenido_extraido,
        1
    ))

    conexion.commit()
    id_archivo = cursor.lastrowid
    conexion.close()

    return id_archivo, None


def obtener_archivos_por_base(id_usuario, id_base):
    conexion = get_connection()
    cursor = conexion.cursor()

    cursor.execute("""
        SELECT *
        FROM archivos
        WHERE id_usuario = ?
        AND id_base = ?
        ORDER BY fecha_subida DESC
    """, (
        id_usuario,
        id_base
    ))

    archivos = cursor.fetchall()
    conexion.close()

    return archivos


def obtener_archivo(id_usuario, id_archivo):
    conexion = get_connection()
    cursor = conexion.cursor()

    cursor.execute("""
        SELECT *
        FROM archivos
        WHERE id_usuario = ?
        AND id_archivo = ?
    """, (
        id_usuario,
        id_archivo
    ))

    archivo = cursor.fetchone()
    conexion.close()

    return archivo


def eliminar_archivo(id_usuario, id_archivo):
    archivo = obtener_archivo(id_usuario, id_archivo)

    if not archivo:
        return 0

    ruta = Path(archivo["ruta_archivo"])

    conexion = get_connection()
    cursor = conexion.cursor()

    cursor.execute("""
        DELETE FROM archivos
        WHERE id_usuario = ?
        AND id_archivo = ?
    """, (
        id_usuario,
        id_archivo
    ))

    conexion.commit()
    filas = cursor.rowcount
    conexion.close()

    if ruta.exists():
        ruta.unlink()

    return filas