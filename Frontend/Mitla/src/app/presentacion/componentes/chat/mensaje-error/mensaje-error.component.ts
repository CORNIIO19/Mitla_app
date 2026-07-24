import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-mensaje-error',
  standalone: true,
  templateUrl: './mensaje-error.component.html',
  styleUrls: ['./mensaje-error.component.scss'],
  imports: [
    CommonModule
  ]
})
export class MensajeErrorComponent {
  /**
   * Texto que explica el problema ocurrido.
   */
  @Input()
  mensaje =
    'No se pudo obtener una respuesta de MITLA.';

  /**
   * Determina si debe aparecer el botón de reintento.
   */
  @Input()
  permitirReintento = true;

  /**
   * Deshabilita las acciones mientras MITLA
   * está procesando nuevamente la consulta.
   */
  @Input()
  deshabilitado = false;

  /**
   * Solicita volver a ejecutar la consulta fallida.
   */
  @Output()
  readonly reintentar =
    new EventEmitter<void>();

  /**
   * Solicita ocultar el aviso de error.
   */
  @Output()
  readonly cerrar =
    new EventEmitter<void>();

  solicitarReintento(): void {
    if (
      this.deshabilitado ||
      !this.permitirReintento
    ) {
      return;
    }

    this.reintentar.emit();
  }

  cerrarMensaje(): void {
    if (this.deshabilitado) {
      return;
    }

    this.cerrar.emit();
  }
}
