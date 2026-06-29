import { Observable } from 'rxjs';

import { Etiqueta } from '../entidades/etiqueta.model';
import {
  CrearEtiquetaDTO,
  AsignarEtiquetaDTO
} from '../../aplicacion/dtos/etiqueta.dto';

export abstract class EtiquetaRepositorio {
  abstract listar(): Observable<Etiqueta[]>;

  abstract crear(datos: CrearEtiquetaDTO): Observable<Etiqueta>;

  abstract asignarAArchivo(datos: AsignarEtiquetaDTO): Observable<void>;
}