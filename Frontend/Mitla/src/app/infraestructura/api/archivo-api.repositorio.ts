import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ArchivoRepositorio,
  RespuestaSubirArchivo,
  RespuestaArchivo
} from '../../dominio/repositorios/archivo.repositorio';

import { Archivo } from '../../dominio/entidades/archivo.model';
import { SubirArchivoDTO } from '../../aplicacion/dtos/archivo.dto';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class ArchivoApiRepositorio extends ArchivoRepositorio {

  constructor(private http: HttpClient) {
    super();
  }

  listarPorBase(idBase: number): Observable<Archivo[]> {
    return this.http.get<Archivo[]>(`${API_URL}/archivos/base/${idBase}`);
  }

  subir(datos: SubirArchivoDTO): Observable<RespuestaSubirArchivo> {
    const formData = new FormData();

    formData.append('archivo', datos.archivo);

    return this.http.post<RespuestaSubirArchivo>(
      `${API_URL}/archivos/base/${datos.idBase}/subir`,
      formData
    );
  }

  obtener(idArchivo: number): Observable<Archivo> {
    return this.http.get<Archivo>(`${API_URL}/archivos/${idArchivo}`);
  }

  eliminar(idArchivo: number): Observable<RespuestaArchivo> {
    return this.http.delete<RespuestaArchivo>(`${API_URL}/archivos/${idArchivo}`);
  }
}