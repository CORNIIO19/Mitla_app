import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-chat-bienvenida',
  templateUrl: './chat-bienvenida.component.html',
  styleUrls: ['./chat-bienvenida.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonButton]
})
export class ChatBienvenidaComponent {
  @Input() nombreUsuario = 'Usuario';
  @Input() inicialUsuario = 'U';
  @Input() basesCount = 0;
  @Input() conversacionesCount = 0;
}