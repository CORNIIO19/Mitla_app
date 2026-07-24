import { MensajeChat } from './mensaje-chat.model';

export interface ConversacionChat {
  id: string;
  titulo: string;
  idBase: number | null;
  mensajes: MensajeChat[];
  fechaCreacion: Date;
  fechaActualizacion: Date;
}