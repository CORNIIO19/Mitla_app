import { Injectable } from '@angular/core';

const TOKEN_KEY = 'mitla_access_token';
const USUARIO_KEY = 'mitla_usuario';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  guardarToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  eliminarToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  existeToken(): boolean {
    return !!this.obtenerToken();
  }

  guardarUsuario<T>(usuario: T): void {
    localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
  }

  obtenerUsuario<T>(): T | null {
    const usuario = localStorage.getItem(USUARIO_KEY);

    if (!usuario) {
      return null;
    }

    try {
      return JSON.parse(usuario) as T;
    } catch {
      return null;
    }
  }

  eliminarUsuario(): void {
    localStorage.removeItem(USUARIO_KEY);
  }

  limpiarSesion(): void {
    this.eliminarToken();
    this.eliminarUsuario();
  }
}