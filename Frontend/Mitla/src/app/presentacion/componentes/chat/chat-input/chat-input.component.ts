import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton]
})
export class ChatInputComponent {
  @Input() valor = '';
  @Input() placeholder = 'Pregunta algo sobre tus bases de conocimiento...';
  @Input() deshabilitado = false;

  @Output() valorChange = new EventEmitter<string>();
  @Output() enviar = new EventEmitter<void>();

  actualizarValor(event: Event): void {
    this.valorChange.emit((event.target as HTMLTextAreaElement).value);
  }
}