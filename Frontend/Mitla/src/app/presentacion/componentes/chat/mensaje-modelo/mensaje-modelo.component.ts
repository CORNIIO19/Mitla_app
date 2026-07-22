import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatMensaje } from '../chat.types';

@Component({
  selector: 'app-mensaje-modelo',
  templateUrl: './mensaje-modelo.component.html',
  styleUrls: ['./mensaje-modelo.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MensajeModeloComponent {
  @Input({ required: true }) mensaje!: ChatMensaje;
}