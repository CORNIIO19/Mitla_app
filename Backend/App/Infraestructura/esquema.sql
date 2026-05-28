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

CREATE TABLE carpetas (
    id_carpeta INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE
);

CREATE TABLE bases_conocimiento (
    id_base INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario_creador INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    privacidad TEXT DEFAULT 'privada',
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario_creador)
    REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE
);

CREATE TABLE notas (
    id_nota INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_carpeta INTEGER,
    titulo TEXT NOT NULL,
    contenido TEXT,
    formato TEXT DEFAULT 'md',
    ruta_archivo TEXT,
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TEXT DEFAULT CURRENT_TIMESTAMP,
    visibilidad TEXT DEFAULT 'privada',
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE,
    FOREIGN KEY (id_carpeta)
    REFERENCES carpetas(id_carpeta)
    ON DELETE SET NULL
);

CREATE TABLE documentos (
    id_documento INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_nota INTEGER,
    nombre_original TEXT NOT NULL,
    extension TEXT,
    mime_type TEXT,
    ruta_archivo TEXT NOT NULL,
    tamano INTEGER,
    texto_extraido TEXT,
    procesado INTEGER DEFAULT 0,
    fecha_subida TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE,
    FOREIGN KEY (id_nota)
    REFERENCES notas(id_nota)
    ON DELETE CASCADE
);

CREATE TABLE etiquetas (
    id_etiqueta INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT UNIQUE NOT NULL
);

CREATE TABLE nota_etiqueta (
    id_nota INTEGER NOT NULL,
    id_etiqueta INTEGER NOT NULL,
    PRIMARY KEY (id_nota, id_etiqueta),
    FOREIGN KEY (id_nota)
    REFERENCES notas(id_nota)
    ON DELETE CASCADE,
    FOREIGN KEY (id_etiqueta)
    REFERENCES etiquetas(id_etiqueta)
    ON DELETE CASCADE
);

CREATE TABLE base_nota (
    id_base INTEGER NOT NULL,
    id_nota INTEGER NOT NULL,
    PRIMARY KEY (id_base, id_nota),
    FOREIGN KEY (id_base)
    REFERENCES bases_conocimiento(id_base)
    ON DELETE CASCADE,
    FOREIGN KEY (id_nota)
    REFERENCES notas(id_nota)
    ON DELETE CASCADE
);

CREATE INDEX idx_notas_usuario
ON notas(id_usuario);

CREATE INDEX idx_bases_usuario
ON bases_conocimiento(id_usuario_creador);

CREATE INDEX idx_documentos_usuario
ON documentos(id_usuario);