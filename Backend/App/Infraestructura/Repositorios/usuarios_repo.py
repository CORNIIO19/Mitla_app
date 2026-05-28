from App.Infraestructura.base_datos import get_connection


def create_user(nombre, email, telefono, password_hash):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO usuarios (
            nombre,
            email,
            telefono,
            password_hash
        )
        VALUES (?, ?, ?, ?)
    """, (
        nombre,
        email,
        telefono,
        password_hash
    ))

    connection.commit()
    id_usuario = cursor.lastrowid
    connection.close()

    return id_usuario


def get_user_by_email(email):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM usuarios
        WHERE email = ?
    """, (email,))

    usuario = cursor.fetchone()
    connection.close()

    return usuario