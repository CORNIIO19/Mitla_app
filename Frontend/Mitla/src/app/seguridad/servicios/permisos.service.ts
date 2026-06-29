import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  puedeEditar(esPropietario: boolean): boolean {
    return esPropietario;
  }

  puedeEliminar(esPropietario: boolean): boolean {
    return esPropietario;
  }

  puedeVer(tieneAcceso: boolean): boolean {
    return tieneAcceso;
  }
}