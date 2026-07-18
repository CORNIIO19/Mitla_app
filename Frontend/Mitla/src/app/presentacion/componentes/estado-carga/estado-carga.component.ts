import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonSpinner,
  IonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-estado-carga',
  templateUrl: './estado-carga.component.html',
  styleUrls: ['./estado-carga.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonSpinner,
    IonText
  ]
})
export class EstadoCargaComponent {
  @Input() mensaje = 'Cargando...';
}