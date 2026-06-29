import { Injectable } from '@angular/core';

import { ArchivoRepositorio } from '../../dominio/repositorios/archivo.repositorio';

@Injectable({
  providedIn: 'root'
})
export class ListarArchivosUseCase {

  constructor(private archivoRepositorio: ArchivoRepositorio) {}

  ejecutar(idBase: number) {
    return this.archivoRepositorio.listarPorBase(idBase);
  }
}