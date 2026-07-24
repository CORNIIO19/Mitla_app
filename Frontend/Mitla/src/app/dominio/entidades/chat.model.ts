export interface ConsultaChat {
  id_base: number;
  pregunta: string;
}

export interface FuenteChat {
  id_archivo?: number;
  titulo?: string;
  fragmento?: string;
}

export interface RespuestaChat {
  respuesta: string;
  id_base: number;
  nombre_base: string;
  fuentes: FuenteChat[];
  modo: string;
}