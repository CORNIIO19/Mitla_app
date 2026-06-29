import { Injectable } from '@angular/core';

import { RegistroUsuarioDTO } from '../dtos/registro-usuario.dto';
import { UsuarioRepositorio } from '../../dominio/repositorios/usuario.repositorio';

@Injectable({
  providedIn: 'root'
})
export class RegistrarUsuarioUseCase {

  constructor(private usuarioRepositorio: UsuarioRepositorio) {}

  ejecutar(datos: RegistroUsuarioDTO) {
    return this.usuarioRepositorio.registrar(datos);
  }
}