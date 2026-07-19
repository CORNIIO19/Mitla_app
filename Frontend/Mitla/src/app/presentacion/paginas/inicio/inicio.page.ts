import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import {
  IonContent, IonButton, IonCol, IonCard, IonCardHeader, IonCardTitle, IonHeader, IonText, IonSpinner, IonGrid, IonRow, IonCardContent, IonLabel, IonList, IonItem } from '@ionic/angular/standalone';

import { TokenService } from '../../../seguridad/servicios/token.service';
import { ListarBasesUseCase } from '../../../aplicacion/casos-uso/listar-bases.usecase';
import { BaseConocimiento } from '../../../dominio/entidades/base-conocimiento.model';
import { Usuario } from '../../../dominio/entidades/usuario.model';

import { EstadoCargaComponent } from '../../componentes/estado-carga/estado-carga.component';
import { MensajeAlertaComponent } from '../../componentes/mensaje-alerta/mensaje-alerta.component';

interface MensajeDashboard {
  rol: 'usuario' | 'asistente';
  contenido: string;
  hora: string;
}

interface ConversacionHistorial {
  id: number;
  titulo: string;
  base: string;
  fecha: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonLabel, IonCardContent, IonRow, IonGrid, IonSpinner, IonText, IonHeader, IonCardTitle, IonCardHeader, IonCard, IonCol, IonButton, 
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    EstadoCargaComponent,
    MensajeAlertaComponent
  ]
})
export class InicioPage {
  usuario: Usuario | null = null;
  bases: BaseConocimiento[] = [];

  cargando = false;
  error = '';

  busqueda = '';
  pregunta = '';

  conversaciones: ConversacionHistorial[] = [
    {
      id: 1,
      titulo: 'Resumen de sistemas operativos',
      base: 'Sistemas Operativos',
      fecha: 'Hoy'
    },
    {
      id: 2,
      titulo: 'Conceptos de redes',
      base: 'Redes',
      fecha: 'Ayer'
    },
    {
      id: 3,
      titulo: 'Preguntas para examen',
      base: 'Base académica',
      fecha: 'Reciente'
    }
  ];

  mensajesChat: MensajeDashboard[] = [];

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
        this.error = 'No se pudo cargar la información del dashboard.';
        this.cargando = false;
      }
    });
  }

  get inicialUsuario(): string {
    return this.usuario?.nombre
      ? this.usuario.nombre.charAt(0).toUpperCase()
      : 'U';
  }

    get chatIniciado(): boolean {
      return this.mensajesChat.length > 0;
    }

  get conversacionesFiltradas(): ConversacionHistorial[] {
    const texto = this.busqueda.trim().toLowerCase();

    if (!texto) {
      return this.conversaciones;
    }

    return this.conversaciones.filter((conversacion) =>
      conversacion.titulo.toLowerCase().includes(texto) ||
      conversacion.base.toLowerCase().includes(texto)
    );
  }

  irAInicio(): void {
    this.router.navigate(['/inicio']);
  }

  irABases(): void {
    this.router.navigate(['/bases-conocimiento']);
  }

  irAChat(): void {
    this.router.navigate(['/inicio']);
  }

  irAConfiguracion(): void {
    this.router.navigate(['/configuracion']);
  }

  irASincronizacion(): void {
    this.router.navigate(['/sincronizacion']);
  }

  abrirConversacion(conversacion: ConversacionHistorial): void {
  this.mensajesChat = [
    {
      rol: 'asistente',
      contenido: `Has abierto la conversación "${conversacion.titulo}" de la base "${conversacion.base}". Más adelante aquí cargaremos el historial real desde el backend.`,
      hora: 'Ahora'
    }
  ];
}

  enviarPregunta(): void {
  const texto = this.pregunta.trim();

  if (!texto) {
    return;
  }

  this.mensajesChat.push({
    rol: 'usuario',
    contenido: texto,
    hora: 'Ahora'
  });

  this.pregunta = '';

  this.mensajesChat.push({
    rol: 'asistente',
    contenido: 'Todavía no estoy conectado al motor RAG, pero esta será el área donde responderé usando tus bases de conocimiento.',
    hora: 'Ahora'
  });
}

  cerrarSesion(): void {
    this.tokenService.limpiarSesion();
    this.router.navigate(['/login']);
  }

}