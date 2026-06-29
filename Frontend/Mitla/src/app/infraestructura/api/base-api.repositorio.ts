import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  BaseConocimientoRepositorio,
  RespuestaCrearBase,
  RespuestaBase
} from '../../dominio/repositorios/base-conocimiento.repositorio';

import { BaseConocimiento } from '../../dominio/entidades/base-conocimiento.model';
import { CrearBaseDTO } from '../../aplicacion/dtos/crear-base.dto';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class BaseApiRepositorio extends BaseConocimientoRepositorio {

  constructor(private http: HttpClient) {
    super();
  }

  listar(): Observable<BaseConocimiento[]> {
    return this.http.get<BaseConocimiento[]>(`${API_URL}/bases/`);
  }

  crear(datos: CrearBaseDTO): Observable<RespuestaCrearBase> {
    return this.http.post<RespuestaCrearBase>(`${API_URL}/bases/`, datos);
  }

  obtener(idBase: number): Observable<BaseConocimiento> {
    return this.http.get<BaseConocimiento>(`${API_URL}/bases/${idBase}`);
  }

  actualizar(idBase: number, datos: CrearBaseDTO): Observable<RespuestaBase> {
    return this.http.put<RespuestaBase>(`${API_URL}/bases/${idBase}`, datos);
  }

  eliminar(idBase: number): Observable<RespuestaBase> {
    return this.http.delete<RespuestaBase>(`${API_URL}/bases/${idBase}`);
  }
}