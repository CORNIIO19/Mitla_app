import { Observable } from 'rxjs';

import {
  ConsultaChatDto
} from '../dtos/consulta-chat.dto';

import {
  RespuestaChatDto
} from '../dtos/respuesta-chat.dto';

export abstract class ChatGateway {
  abstract preguntar(
    consulta: ConsultaChatDto
  ): Observable<RespuestaChatDto>;
}