import {
  FuenteChat
} from './chat.model';

export type RolMensajeChat =
  | 'usuario'
  | 'asistente'
  | 'sistema';

export type EstadoMensajeChat =
  | 'enviando'
  | 'enviado'
  | 'error';

export interface MensajeChat {
  /**
   * Identificador local del mensaje.
   *
   * Permite actualizar posteriormente su estado,
   * por ejemplo, de "enviando" a "enviado".
   */
  id: string;

  /**
   * Indica quién produjo el mensaje.
   */
  rol: RolMensajeChat;

  /**
   * Texto mostrado dentro de la conversación.
   */
  contenido: string;

  /**
   * Fecha en la que se creó el mensaje.
   */
  fecha: Date;

  /**
   * Estado local del envío.
   */
  estado: EstadoMensajeChat;

  /**
   * Base utilizada para contextualizar la consulta.
   */
  idBase?: number;

  nombreBase?: string;

  /**
   * Documentos o fragmentos utilizados por el RAG.
   *
   * Por ahora normalmente será un arreglo vacío.
   */
  fuentes?: FuenteChat[];

  /**
   * Indica cómo fue generada la respuesta:
   * "simulado", "rag", etc.
   */
  modo?: string;
}