import {
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Archivo
} from '../../../dominio/entidades/archivo.model';

@Component({
  selector: 'app-visor-nota',
  standalone: true,
  templateUrl: './visor-nota.component.html',
  styleUrls: ['./visor-nota.component.scss'],
  imports: [
    CommonModule
  ]
})
export class VisorNotaComponent {
  @Input({ required: true })
  archivo!: Archivo;
}