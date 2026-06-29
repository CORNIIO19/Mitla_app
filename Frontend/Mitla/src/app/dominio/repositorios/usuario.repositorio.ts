import { Observable } from 'rxjs';

import { Usuario } from '../entidades/usuario.model';
import { LoginDTO } from '../../aplicacion/dtos/login.dto';
import { RegistroUsuarioDTO } from '../../aplicacion/dtos/registro-usuario.dto';

export interface RespuestaLogin {
  message: string;
  access_token: string;
  usuario: Usuario;
}

export interface RespuestaRegistro {
  message: string;
  id_usuario: number;
}

export abstract class UsuarioRepositorio {
  abstract login(datos: LoginDTO): Observable<RespuestaLogin>;

  abstract registrar(datos: RegistroUsuarioDTO): Observable<RespuestaRegistro>;
}