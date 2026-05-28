import sqlite3

from App.config import DB_PATH, SCHEMA_PATH


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def initialize_database():
    DB_PATH.parent.mkdir(exist_ok=True)

    if DB_PATH.exists():
        print("Base de datos encontrada. No se recrea.")
        return

    connection = sqlite3.connect(DB_PATH)

    with open(SCHEMA_PATH, "r", encoding="utf-8") as file:
        connection.executescript(file.read())

    connection.commit()
    connection.close()
