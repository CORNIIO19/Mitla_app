import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-indicador-escritura',
  standalone: true,
  templateUrl: './indicador-escritura.component.html',
  styleUrls: ['./indicador-escritura.component.scss']
})
export class IndicadorEscrituraComponent {
  @Input()
  texto = 'Mitla está procesando tu consulta';
}