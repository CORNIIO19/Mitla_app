export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  telefono?: string;
  verificado?: boolean | number;
  nivel_privacidad?: string;
  fecha_creacion?: string;
}