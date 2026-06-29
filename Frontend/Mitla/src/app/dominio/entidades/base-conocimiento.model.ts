export interface BaseConocimiento {
  id_base: number;
  id_usuario: number;
  nombre: string;
  descripcion?: string;
  ruta_carpeta?: string;
  fecha_creacion?: string;
}