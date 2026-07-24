import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonList,
  IonLabel,
  IonText,
  IonSpinner,
  IonButtons
} from '@ionic/angular/standalone';

import { BaseConocimiento } from '../../../dominio/entidades/base-conocimiento.model';
import { ListarBasesUseCase } from '../../../aplicacion/casos-uso/listar-bases.usecase';
import { CrearBaseUseCase } from '../../../aplicacion/casos-uso/crear-base.usecase';
import { ActualizarBaseUseCase } from '../../../aplicacion/casos-uso/actualizar-base.usecase';
import { TarjetaBaseComponent } from '../../componentes/tarjeta-base/tarjeta-base.component';
import { EstadoCargaComponent } from '../../componentes/estado-carga/estado-carga.component';
import { EstadoVacioComponent } from '../../componentes/estado-vacio/estado-vacio.component';
import { MensajeAlertaComponent } from '../../componentes/mensaje-alerta/mensaje-alerta.component';
@Component({
  selector: 'app-bases-conocimiento',
  templateUrl: './bases-conocimiento.page.html',
  styleUrls: ['./bases-conocimiento.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    // IonHeader,
    // IonTitle,
    // IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    // IonList,
    IonLabel,
    // IonText,
    // IonSpinner,
    // IonButtons,
    TarjetaBaseComponent,
    EstadoCargaComponent,
    EstadoVacioComponent,
    MensajeAlertaComponent
  ]
})
export class BasesConocimientoPage implements OnInit{
  bases: BaseConocimiento[] = [];

  nombre = '';
  descripcion = '';

  idBaseEditando: number | null = null;

  cargando = false;
  creando = false;
  editando = false;

  error = '';
  mensaje = '';


  constructor(
    private listarBasesUseCase: ListarBasesUseCase,
    private crearBaseUseCase: CrearBaseUseCase,
    private actualizarBaseUseCase: ActualizarBaseUseCase,
    private router: Router,
  ) {}

  ngOnInit(): void {
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
        this.limpiarFormulario();
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

iniciarEdicion(base: BaseConocimiento): void {
  this.idBaseEditando = base.id_base;
  this.nombre = base.nombre;
  this.descripcion = base.descripcion || '';

  this.error = '';
  this.mensaje = '';
}

  guardarCambios(): void {
    this.error = '';
    this.mensaje = '';

    if (!this.idBaseEditando) {
      this.error = 'No hay una base seleccionada para editar.';
      return;
    }

    const nombreLimpio = this.nombre.trim();
    const descripcionLimpia = this.descripcion.trim();

    if (!nombreLimpio) {
      this.error = 'El nombre de la base es obligatorio.';
      return;
    }

    this.editando = true;

    this.actualizarBaseUseCase.ejecutar(this.idBaseEditando, {
      nombre: nombreLimpio,
      descripcion: descripcionLimpia || undefined
    }).subscribe({
      next: () => {
        this.mensaje = 'Base de conocimiento actualizada correctamente.';
        this.limpiarFormulario();
        this.editando = false;
        this.cargarBases();
      },
      error: (error) => {
        console.error(error);
        this.error = 'No se pudo actualizar la base de conocimiento.';
        this.editando = false;
      }
    });
  }

  cancelarEdicion(): void {
    this.limpiarFormulario();
    this.error = '';
    this.mensaje = '';
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.descripcion = '';
    this.idBaseEditando = null;
  }

  abrirBase(base: BaseConocimiento): void {
    this.router.navigate(['/archivos', base.id_base]);
  }
}