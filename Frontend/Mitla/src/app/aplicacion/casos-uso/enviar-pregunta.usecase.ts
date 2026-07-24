import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ChatGateway
} from '../../dominio/contratos/chat.repositorio';

import {
  ConsultaChatDto
} from '../../aplicacion/dtos/consulta-chat.dto';

import {
  RespuestaChatDto
} from '../../aplicacion/dtos/respuesta-chat.dto';

@Injectable({
  providedIn: 'root'
})
export class EnviarPreguntaUseCase {
  constructor(
    private readonly chatGateway: ChatGateway
  ) {}

  ejecutar(
    consulta: ConsultaChatDto
  ): Observable<RespuestaChatDto> {
    return this.chatGateway.preguntar(consulta);
  }
}