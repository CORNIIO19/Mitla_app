import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BarraSuperiorComponent } from '../../componentes/barra-superior/barra-superior.component';

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
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner
} from '@ionic/angular/standalone';

import { TokenService } from '../../../seguridad/servicios/token.service';
import { ListarBasesUseCase } from '../../../aplicacion/casos-uso/listar-bases.usecase';
import { BaseConocimiento } from '../../../dominio/entidades/base-conocimiento.model';
import { Usuario } from '../../../dominio/entidades/usuario.model';

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
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner,
    BarraSuperiorComponent
  ]
})
export class InicioPage {
  usuario: Usuario | null = null;
  bases: BaseConocimiento[] = [];

  cargando = false;
  error = '';

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private listarBasesUseCase: ListarBasesUseCase
  ) {}

  ionViewWillEnter(): void {
    this.usuario = this.tokenService.obtenerUsuario<Usuario>();
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.cargando = true;
    this.error = '';

    this.listarBasesUseCase.ejecutar().subscribe({
      next: (bases) => {
        this.bases = bases;
        this.cargando = false;
      },
      error: (error) => {
        console.error(error);
        this.error = 'No se pudo cargar el resumen del dashboard.';
        this.cargando = false;
      }
    });
  }

  get totalBases(): number {
    return this.bases.length;
  }

  get basesRecientes(): BaseConocimiento[] {
    return this.bases.slice(0, 3);
  }

  irABases(): void {
    this.router.navigate(['/bases-conocimiento']);
  }

  irAArchivos(base: BaseConocimiento): void {
    this.router.navigate(['/archivos', base.id_base]);
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
