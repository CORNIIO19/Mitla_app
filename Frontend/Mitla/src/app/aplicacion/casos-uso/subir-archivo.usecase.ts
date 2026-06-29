import { Injectable } from '@angular/core';

import { SubirArchivoDTO } from '../dtos/archivo.dto';
import { ArchivoRepositorio } from '../../dominio/repositorios/archivo.repositorio';
import { extensionPermitida } from '../../dominio/reglas/extensiones-archivo.rule';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoUseCase {

  constructor(private archivoRepositorio: ArchivoRepositorio) {}

  ejecutar(datos: SubirArchivoDTO) {
    if (!extensionPermitida(datos.archivo.name)) {
      throw new Error('Tipo de archivo no permitido.');
    }

    return this.archivoRepositorio.subir(datos);
  }
}