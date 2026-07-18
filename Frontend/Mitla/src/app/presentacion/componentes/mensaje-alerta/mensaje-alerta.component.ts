import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-mensaje-alerta',
  templateUrl: './mensaje-alerta.component.html',
  styleUrls: ['./mensaje-alerta.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonText
  ]
})
export class MensajeAlertaComponent {
  @Input() mensaje = '';
  @Input() tipo: 'success' | 'danger' | 'warning' | 'medium' = 'danger';
}
