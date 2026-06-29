import { Injectable } from '@angular/core';

import { BaseConocimientoRepositorio } from '../../dominio/repositorios/base-conocimiento.repositorio';

@Injectable({
  providedIn: 'root'
})
export class ListarBasesUseCase {

  constructor(private baseRepositorio: BaseConocimientoRepositorio) {}

  ejecutar() {
    return this.baseRepositorio.listar();
  }
}