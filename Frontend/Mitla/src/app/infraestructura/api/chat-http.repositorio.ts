import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  ChatGateway
} from '../../dominio/contratos/chat.repositorio';

import {
  ConsultaChat,
  RespuestaChat
} from '../../dominio/entidades/chat.model';

import {
  API_URL
} from './api.config';

@Injectable()
export class ChatHttpRepositorio
  extends ChatGateway {

  /*
   * API_URL ya contiene:
   *
   * http://127.0.0.1:5000/api
   *
   * Por eso aquí no volvemos a agregar "/api".
   */
  private readonly url =
    `${API_URL}/chat/preguntar`;

  constructor(
    private readonly http: HttpClient
  ) {
    super();
  }

  preguntar(
    consulta: ConsultaChat
  ): Observable<RespuestaChat> {
    return this.http.post<RespuestaChat>(
      this.url,
      consulta
    );
  }
}