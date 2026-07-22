import { Observable } from 'rxjs';

import { Archivo } from '../entidades/archivo.model';
import { SubirArchivoDTO } from '../../aplicacion/dto/archivo.dto';

export interface RespuestaSubirArchivo {
  mensaje: string;
  id_archivo: number;
}

export interface RespuestaArchivo {
  mensaje: string;
}

export abstract class ArchivoRepositorio {
  abstract listarPorBase(idBase: number): Observable<Archivo[]>;

  abstract subir(datos: SubirArchivoDTO): Observable<RespuestaSubirArchivo>;

  abstract obtener(idArchivo: number): Observable<Archivo>;

  abstract eliminar(idArchivo: number): Observable<RespuestaArchivo>;
}