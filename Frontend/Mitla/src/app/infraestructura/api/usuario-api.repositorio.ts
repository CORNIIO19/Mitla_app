import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  UsuarioRepositorio,
  RespuestaLogin,
  RespuestaRegistro
} from '../../dominio/repositorios/usuario.repositorio';

import { LoginDTO } from '../../aplicacion/dtos/login.dto';
import { RegistroUsuarioDTO } from '../../aplicacion/dtos/registro-usuario.dto';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiRepositorio extends UsuarioRepositorio {

  constructor(private http: HttpClient) {
    super();
  }

  login(datos: LoginDTO): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(`${API_URL}/auth/login`, datos);
  }

  registrar(datos: RegistroUsuarioDTO): Observable<RespuestaRegistro> {
    return this.http.post<RespuestaRegistro>(`${API_URL}/auth/register`, datos);
  }
}