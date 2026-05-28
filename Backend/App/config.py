from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DB_PATH = BASE_DIR / "Instancia" / "Gestor_notas.db"

SCHEMA_PATH = BASE_DIR / "App" / "Infraestructura" / "esquema.sql"

STORAGE_PATH = BASE_DIR / "Almacenamiento"