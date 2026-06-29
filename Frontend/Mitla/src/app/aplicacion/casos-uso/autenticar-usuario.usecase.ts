import { Injectable } from '@angular/core';

import { LoginDTO } from '../dtos/login.dto';
import { UsuarioRepositorio } from '../../dominio/repositorios/usuario.repositorio';

@Injectable({
  providedIn: 'root'
})
export class AutenticarUsuarioUseCase {

  constructor(private usuarioRepositorio: UsuarioRepositorio) {}

  ejecutar(datos: LoginDTO) {
    return this.usuarioRepositorio.login(datos);
  }
}