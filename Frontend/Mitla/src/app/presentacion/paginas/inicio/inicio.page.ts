import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenService } from '../../../seguridad/servicios/token.service';
import { ListarBasesUseCase } from '../../../aplicacion/casos-uso/listar-bases.usecase';

import { BaseConocimiento } from '../../../dominio/entidades/base-conocimiento.model';
import { Usuario } from '../../../dominio/entidades/usuario.model';

import { EstadoCargaComponent } from '../../componentes/estado-carga/estado-carga.component';
import { MensajeAlertaComponent } from '../../componentes/mensaje-alerta/mensaje-alerta.component';

import { ChatInputComponent } from '../../componentes/chat/chat-input/chat-input.component';
import { ChatConversacionComponent } from '../../componentes/chat/chat-conversacion/chat-conversacion.component';
import { ChatMensaje } from '../../componentes/chat/chat.types';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [IonContent, 
    CommonModule,
    EstadoCargaComponent,
    MensajeAlertaComponent,
    ChatInputComponent,
    ChatConversacionComponent
  ]
})
export class InicioPage implements OnInit {
  usuario: Usuario | null = null;
  bases: BaseConocimiento[] = [];

  cargando = false;
  error = '';

  pregunta = '';
  mensajesChat: ChatMensaje[] = [];

  constructor(
    private tokenService: TokenService,
    private listarBasesUseCase: ListarBasesUseCase
  ) {}

  ngOnInit(): void {
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

        this.error =
          'No se pudo cargar la información del dashboard.';

        this.cargando = false;
      }
    });
  }

  get inicialUsuario(): string {
    return this.usuario?.nombre?.trim()
      ? this.usuario.nombre.trim().charAt(0).toUpperCase()
      : 'U';
  }

  get chatIniciado(): boolean {
    return this.mensajesChat.length > 0;
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
      contenido:
        'Todavía no estoy conectado al motor RAG, pero esta será el área donde responderé utilizando tus bases de conocimiento.',
      hora: 'Ahora'
    });
  }
}