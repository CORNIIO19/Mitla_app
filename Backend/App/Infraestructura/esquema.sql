PRAGMA foreign_keys = ON;

CREATE TABLE usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefono TEXT,
    password_hash TEXT NOT NULL,
    verificado INTEGER DEFAULT 0,
    nivel_privacidad TEXT DEFAULT 'privado',
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bases_conocimiento (
    id_base INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    ruta_carpeta TEXT NOT NULL,
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE
);

CREATE TABLE archivos (
    id_archivo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_base INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    nombre_archivo TEXT NOT NULL,
    extension TEXT NOT NULL,
    mime_type TEXT,
    ruta_archivo TEXT NOT NULL,
    contenido_extraido TEXT,
    procesado INTEGER DEFAULT 0,
    fecha_subida TEXT DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_base)
    REFERENCES bases_conocimiento(id_base)
    ON DELETE CASCADE,

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE
);

CREATE INDEX idx_bases_usuario
ON bases_conocimiento(id_usuario);

CREATE INDEX idx_archivos_base
ON archivos(id_base);

CREATE INDEX idx_archivos_usuario
ON archivos(id_usuario);