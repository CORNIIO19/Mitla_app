import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatInputComponent } from '../chat-input/chat-input.component';
import { MensajeModeloComponent } from '../mensaje-modelo/mensaje-modelo.component';
import { MensajeUsuarioComponent } from '../mensaje-usuario/mensaje-usuario.component';
import type { ChatMensaje } from '../chat.types';

@Component({
  selector: 'app-chat-conversacion',
  templateUrl: './chat-conversacion.component.html',
  styleUrls: ['./chat-conversacion.component.scss'],
  standalone: true,
  imports: [CommonModule, ChatInputComponent, MensajeModeloComponent, MensajeUsuarioComponent]
})
export class ChatConversacionComponent {
  @Input() mensajes: ChatMensaje[] = [];
  @Input() pregunta = '';
  @Input() inicialUsuario = 'U';
  @Input() placeholder = 'Pregunta algo sobre tus bases de conocimiento...';

  @Output() preguntaChange = new EventEmitter<string>();
  @Output() enviar = new EventEmitter<void>();
}