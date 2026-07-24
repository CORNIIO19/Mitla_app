import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MensajeChat } from
  '../../../../dominio/entidades/mensaje-chat.model';

@Component({
  selector: 'app-mensaje-usuario',
  standalone: true,
  templateUrl: './mensaje-usuario.component.html',
  styleUrls: ['./mensaje-usuario.component.scss'],
  imports: [
    CommonModule
  ]
})
export class MensajeUsuarioComponent {
  @Input({ required: true })
  mensaje!: MensajeChat;

  @Input()
  inicialUsuario = 'U';
}