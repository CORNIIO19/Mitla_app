from App.Infraestructura.base_datos import get_connection


def create_base(id_usuario_creador, nombre, descripcion, privacidad="privada"):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO bases_conocimiento (
            id_usuario_creador,
            nombre,
            descripcion,
            privacidad
        )
        VALUES (?, ?, ?, ?)
    """, (
        id_usuario_creador,
        nombre,
        descripcion,
        privacidad
    ))

    connection.commit()
    id_base = cursor.lastrowid
    connection.close()

    return id_base


def get_bases_by_user(id_usuario):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM bases_conocimiento
        WHERE id_usuario_creador = ?
        ORDER BY fecha_creacion DESC
    """, (id_usuario,))

    bases = cursor.fetchall()
    connection.close()

    return bases


def add_note_to_base(id_base, id_nota):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT OR IGNORE INTO base_nota (
            id_base,
            id_nota
        )
        VALUES (?, ?)
    """, (
        id_base,
        id_nota
    ))

    connection.commit()
    connection.close()