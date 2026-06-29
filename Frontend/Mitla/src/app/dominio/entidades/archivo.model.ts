export interface Archivo {
  id_archivo: number;
  id_base: number;
  id_usuario: number;
  titulo: string;
  nombre_archivo: string;
  extension: string;
  mime_type?: string;
  ruta_archivo: string;
  contenido_extraido?: string;
  procesado: boolean | number;
  fecha_subida?: string;
  fecha_actualizacion?: string;
}