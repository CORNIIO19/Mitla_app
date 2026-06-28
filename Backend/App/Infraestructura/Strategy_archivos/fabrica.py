from pathlib import Path

from App.Infraestructura.Strategy_archivos.markdown import EstrategiaMarkdown
# from app.infraestructura.estrategias_archivos.texto import EstrategiaTexto


ESTRATEGIAS = {
    ".md": EstrategiaMarkdown(),
    # ".txt": EstrategiaTexto()
}


def obtener_extension(nombre_archivo):
    return Path(nombre_archivo.lower()).suffix


def obtener_estrategia(nombre_archivo):
    extension = obtener_extension(nombre_archivo)

    return ESTRATEGIAS.get(extension)