import { Injectable } from '@angular/core';

import { CrearBaseDTO } from '../dtos/crear-base.dto';
import { BaseConocimientoRepositorio } from '../../dominio/repositorios/base-conocimiento.repositorio';

@Injectable({
  providedIn: 'root'
})
export class ActualizarBaseUseCase {

  constructor(private baseRepositorio: BaseConocimientoRepositorio) {}

  ejecutar(idBase: number, datos: CrearBaseDTO) {
    return this.baseRepositorio.actualizar(idBase, datos);
  }
}