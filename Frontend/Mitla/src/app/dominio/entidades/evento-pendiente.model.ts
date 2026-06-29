export interface EventoPendiente {
  id: string;
  tipo: 'CREAR_BASE' | 'SUBIR_ARCHIVO' | 'ELIMINAR_ARCHIVO' | 'ASIGNAR_ETIQUETA';
  payload: unknown;
  fecha_creacion: string;
  sincronizado: boolean;
}