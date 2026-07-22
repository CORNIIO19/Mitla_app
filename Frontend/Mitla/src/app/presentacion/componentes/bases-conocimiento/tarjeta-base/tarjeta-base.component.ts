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

import { BaseConocimiento } from '../../../../dominio/entidades/base-conocimiento.model';

@Component({
  selector: 'app-tarjeta-base',
  templateUrl: './tarjeta-base.component.html',
  styleUrls: ['./tarjeta-base.component.scss'],
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
export class TarjetaBaseComponent {
  @Input({ required: true }) base!: BaseConocimiento;

  @Output() abrir = new EventEmitter<BaseConocimiento>();
  @Output() editar = new EventEmitter<BaseConocimiento>();

  abrirBase(): void {
    this.abrir.emit(this.base);
  }

  editarBase(event: Event): void {
    event.stopPropagation();
    this.editar.emit(this.base);
  }
}