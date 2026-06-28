from abc import ABC, abstractmethod


class EstrategiaArchivo(ABC):

    @abstractmethod
    def validar(self, archivo):
        pass

    @abstractmethod
    def extraer_contenido(self, ruta_archivo):
        pass