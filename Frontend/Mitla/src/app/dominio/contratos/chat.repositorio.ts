import { Observable } from 'rxjs';

import { MensajeChat } from '../entidades/mensaje-chat.model';

export abstract class ChatRepositorio {
  abstract consultar(idBase: number, pregunta: string): Observable<MensajeChat>;
}