from App.Infraestructura.Strategy_archivos.strategy import EstrategiaArchivo


class EstrategiaMarkdown(EstrategiaArchivo):

    def validar(self, archivo):
        return archivo.filename.lower().endswith(".md")

    def extraer_contenido(self, ruta_archivo):
        with open(ruta_archivo, "r", encoding="utf-8") as archivo:
            return archivo.read()