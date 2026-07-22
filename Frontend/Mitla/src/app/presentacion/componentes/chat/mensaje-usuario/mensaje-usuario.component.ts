import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatMensaje } from '../chat.types';

@Component({
  selector: 'app-mensaje-usuario',
  templateUrl: './mensaje-usuario.component.html',
  styleUrls: ['./mensaje-usuario.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MensajeUsuarioComponent {
  @Input({ required: true }) mensaje!: ChatMensaje;
  @Input() inicialUsuario = 'U';
}