import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonText,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-estado-vacio',
  templateUrl: './estado-vacio.component.html',
  styleUrls: ['./estado-vacio.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonText,
    IonButton
  ]
})
export class EstadoVacioComponent {
  @Input() titulo = 'Sin contenido';
  @Input() mensaje = 'No hay elementos para mostrar.';
  @Input() textoBoton = '';

  @Output() accion = new EventEmitter<void>();

  ejecutarAccion(): void {
    this.accion.emit();
  }
}