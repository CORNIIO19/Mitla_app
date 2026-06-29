import { Injectable } from '@angular/core';

import { ArchivoRepositorio } from '../../dominio/repositorios/archivo.repositorio';

@Injectable({
  providedIn: 'root'
})
export class EliminarArchivoUseCase {

  constructor(private archivoRepositorio: ArchivoRepositorio) {}

  ejecutar(idArchivo: number) {
    return this.archivoRepositorio.eliminar(idArchivo);
  }
}