import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonText
} from '@ionic/angular/standalone';

import { Archivo } from '../../../../dominio/entidades/archivo.model';

@Component({
  selector: 'app-tarjeta-archivo',
  templateUrl: './tarjeta-archivo.component.html',
  styleUrls: ['./tarjeta-archivo.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonText
  ]
})
export class TarjetaArchivoComponent {
  @Input({ required: true }) archivo!: Archivo;

  @Output() abrir = new EventEmitter<Archivo>();
  @Output() eliminar = new EventEmitter<Archivo>();

  abrirArchivo(): void {
    this.abrir.emit(this.archivo);
  }

  eliminarArchivo(event: Event): void {
    event.stopPropagation();
    this.eliminar.emit(this.archivo);
  }
}
