import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { BaseConocimiento } from
  '../../../../dominio/entidades/base-conocimiento.model';

@Component({
  selector: 'app-selector-base',
  standalone: true,
  templateUrl: './selector-base.component.html',
  styleUrls: ['./selector-base.component.scss'],
  imports: [
    CommonModule
  ]
})
export class SelectorBaseComponent {
  @Input()
  bases: BaseConocimiento[] = [];

  @Input()
  idBaseSeleccionada: number | null = null;

  @Input()
  deshabilitado = false;

  @Output()
  readonly idBaseSeleccionadaChange =
    new EventEmitter<number | null>();

  seleccionarBase(valor: string): void {
    if (valor === '') {
      this.idBaseSeleccionadaChange.emit(null);
      return;
    }

    const idBase = Number(valor);

    this.idBaseSeleccionadaChange.emit(
      Number.isNaN(idBase)
        ? null
        : idBase
    );
  }

  identificarBase(
    _indice: number,
    base: BaseConocimiento
  ): number {
    return base.id_base;
  }
}