import { Injectable } from '@angular/core';

import { CrearBaseDTO } from '../dtos/crear-base.dto';
import { BaseConocimientoRepositorio } from '../../dominio/repositorios/base-conocimiento.repositorio';

@Injectable({
  providedIn: 'root'
})
export class CrearBaseUseCase {

  constructor(private baseRepositorio: BaseConocimientoRepositorio) {}

  ejecutar(datos: CrearBaseDTO) {
    return this.baseRepositorio.crear(datos);
  }
}