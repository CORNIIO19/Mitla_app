import { Observable } from 'rxjs';

import { BaseConocimiento } from '../entidades/base-conocimiento.model';
import { CrearBaseDTO } from '../../aplicacion/dtos/crear-base.dto';

export interface RespuestaCrearBase {
  mensaje: string;
  id_base: number;
}

export interface RespuestaBase {
  mensaje: string;
}

export abstract class BaseConocimientoRepositorio {
  abstract listar(): Observable<BaseConocimiento[]>;

  abstract crear(datos: CrearBaseDTO): Observable<RespuestaCrearBase>;

  abstract obtener(idBase: number): Observable<BaseConocimiento>;

  abstract actualizar(idBase: number, datos: CrearBaseDTO): Observable<RespuestaBase>;

  abstract eliminar(idBase: number): Observable<RespuestaBase>;
}