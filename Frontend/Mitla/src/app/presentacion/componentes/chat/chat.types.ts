export interface ChatMensaje {
  rol: 'usuario' | 'asistente';
  contenido: string;
  hora: string;
}

export interface ConversacionReciente {
  id: number;
  titulo: string;
  base: string;
  fecha: string;
}