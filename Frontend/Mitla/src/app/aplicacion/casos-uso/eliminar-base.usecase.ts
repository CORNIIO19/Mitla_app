import { Injectable } from '@angular/core';

import { BaseConocimientoRepositorio } from '../../dominio/repositorios/base-conocimiento.repositorio';

@Injectable({
  providedIn: 'root'
})
export class EliminarBaseUseCase {

  constructor(private baseRepositorio: BaseConocimientoRepositorio) {}

  ejecutar(idBase: number) {
    return this.baseRepositorio.eliminar(idBase);
  }
}