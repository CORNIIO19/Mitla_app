import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../../seguridad/servicios/token.service';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonList,
  IonLabel,
  IonText,
  IonSpinner, IonButtons } from '@ionic/angular/standalone';

import { BaseConocimiento } from '../../../dominio/entidades/base-conocimiento.model';
import { ListarBasesUseCase } from '../../../aplicacion/casos-uso/listar-bases.usecase';
import { CrearBaseUseCase } from '../../../aplicacion/casos-uso/crear-base.usecase';

@Component({
  selector: 'app-bases-conocimiento',
  templateUrl: './bases-conocimiento.page.html',
  styleUrls: ['./bases-conocimiento.page.scss'],
  standalone: true,
  imports: [IonButtons, 
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonList,
    IonLabel,
    IonText,
    IonSpinner
  ]
})
export class BasesConocimientoPage {
  bases: BaseConocimiento[] = [];

  nombre = '';
  descripcion = '';

  cargando = false;
  creando = false;

  error = '';
  mensaje = '';

  constructor(
    private listarBasesUseCase: ListarBasesUseCase,
    private crearBaseUseCase: CrearBaseUseCase,
    private router: Router,
    private tokenService: TokenService

  ) {}

  ionViewWillEnter(): void {
    this.cargarBases();
  }

  cargarBases(): void {
    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    this.listarBasesUseCase.ejecutar().subscribe({
      next: (bases) => {
        this.bases = bases;
        this.cargando = false;
      },
      error: (error) => {
        console.error(error);
        this.error = 'No se pudieron cargar las bases de conocimiento.';
        this.cargando = false;
      }
    });
  }

  crearBase(): void {
    this.error = '';
    this.mensaje = '';

    const nombreLimpio = this.nombre.trim();
    const descripcionLimpia = this.descripcion.trim();

    if (!nombreLimpio) {
      this.error = 'El nombre de la base es obligatorio.';
      return;
    }

    this.creando = true;

    this.crearBaseUseCase.ejecutar({
      nombre: nombreLimpio,
      descripcion: descripcionLimpia || undefined
    }).subscribe({
      next: () => {
        this.mensaje = 'Base de conocimiento creada correctamente.';
        this.nombre = '';
        this.descripcion = '';
        this.creando = false;

        this.cargarBases();
      },
      error: (error) => {
        console.error(error);
        this.error = 'No se pudo crear la base de conocimiento.';
        this.creando = false;
      }
    });
  }

  abrirBase(base: BaseConocimiento): void {
    this.router.navigate(['/archivos', base.id_base]);
  }


cerrarSesion(): void {
  this.tokenService.limpiarSesion();
  this.router.navigate(['/login']);
}

}