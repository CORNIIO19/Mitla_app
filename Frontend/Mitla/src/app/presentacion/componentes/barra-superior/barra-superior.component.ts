import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonBackButton
} from '@ionic/angular/standalone';

import { TokenService } from '../../../seguridad/servicios/token.service';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonBackButton
  ]
})
export class BarraSuperiorComponent {
  @Input() titulo = 'Mitla';
  @Input() mostrarVolver = false;
  @Input() defaultHref = '/inicio';
  @Input() mostrarCerrarSesion = true;

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  cerrarSesion(): void {
    this.tokenService.limpiarSesion();
    this.router.navigate(['/login']);
  }
}