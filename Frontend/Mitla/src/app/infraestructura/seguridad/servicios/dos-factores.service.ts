import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DosFactoresService {

  codigoTieneFormatoValido(codigo: string): boolean {
    return /^\d{6}$/.test(codigo);
  }
}