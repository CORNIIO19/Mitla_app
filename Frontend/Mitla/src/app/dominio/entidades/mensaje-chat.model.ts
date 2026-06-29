export interface MensajeChat {
  id?: string;
  rol: 'usuario' | 'asistente' | 'sistema';
  contenido: string;
  fecha: string;
  id_base?: number;
}