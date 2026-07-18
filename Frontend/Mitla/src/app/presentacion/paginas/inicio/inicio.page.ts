import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonText
} from '@ionic/angular/standalone';

import { TokenService } from '../../../seguridad/servicios/token.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonButtons,
    IonText
  ]
})
export class InicioPage {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  irABases(): void {
    this.router.navigate(['/bases-conocimiento']);
  }

  irAChat(): void {
    this.router.navigate(['/chat']);
  }

  irAConfiguracion(): void {
    this.router.navigate(['/configuracion']);
  }

  irASincronizacion(): void {
    this.router.navigate(['/sincronizacion']);
  }

  cerrarSesion(): void {
    this.tokenService.limpiarSesion();
    this.router.navigate(['/login']);
  }
}
