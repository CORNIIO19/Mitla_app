import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import type { ConversacionReciente } from '../chat.types';

@Component({
  selector: 'app-historial-conversaciones',
  templateUrl: './historial-conversaciones.component.html',
  styleUrls: ['./historial-conversaciones.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HistorialConversacionesComponent {
  @Input() conversaciones: ConversacionReciente[] = [];
  @Output() seleccionar = new EventEmitter<ConversacionReciente>();
}