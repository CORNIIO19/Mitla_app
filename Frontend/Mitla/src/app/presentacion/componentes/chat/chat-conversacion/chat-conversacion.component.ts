import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ChatInputComponent } from
  '../chat-input/chat-input.component';

import { MensajeModeloComponent } from
  '../mensaje-modelo/mensaje-modelo.component';

import { MensajeUsuarioComponent } from
  '../mensaje-usuario/mensaje-usuario.component';

import { IndicadorEscrituraComponent } from
  '../indicador-escritura/indicador-escritura.component';

import { SelectorBaseComponent } from
  '../selector-base/selector-base.component';

import { MensajeChat } from
  '../../../../dominio/entidades/mensaje-chat.model';

import { BaseConocimiento } from
  '../../../../dominio/entidades/base-conocimiento.model';

  import { MensajeErrorComponent } from
  '../mensaje-error/mensaje-error.component';

  @Component({
  selector: 'app-chat-conversacion',
  standalone: true,
  templateUrl: './chat-conversacion.component.html',
  styleUrls: ['./chat-conversacion.component.scss'],
  imports: [
    CommonModule,
    ChatInputComponent,
    MensajeModeloComponent,
    MensajeUsuarioComponent,
    IndicadorEscrituraComponent,
    SelectorBaseComponent,
    MensajeErrorComponent
  ]
})
export class ChatConversacionComponent
  implements OnChanges, AfterViewChecked {

  @ViewChild('contenedorMensajes')
  private contenedorMensajes?: ElementRef<HTMLDivElement>;

  @Input()
  mensajes: MensajeChat[] = [];

  @Input()
  pregunta = '';

  @Input()
  inicialUsuario = 'U';

  @Input()
  placeholder =
    'Pregunta algo sobre tus bases de conocimiento...';

  @Input()
  respondiendo = false;

  @Input()
  bases: BaseConocimiento[] = [];

  @Input()
  idBaseSeleccionada: number | null = null;

  @Input()
  errorChat = '';

  @Input()
  permitirReintento = false;

  @Output()
  readonly reintentar =
    new EventEmitter<void>();

  @Output()
  readonly cerrarError =
    new EventEmitter<void>();

  @Output()
  readonly preguntaChange =
    new EventEmitter<string>();

  @Output()
  readonly idBaseSeleccionadaChange =
    new EventEmitter<number | null>();

  @Output()
  readonly enviar =
    new EventEmitter<void>();

  private desplazamientoPendiente = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['mensajes'] ||
      changes['respondiendo'] ||
      changes['errorChat']
    ) {
      this.desplazamientoPendiente = true;
    }
  }

  ngAfterViewChecked(): void {
    if (!this.desplazamientoPendiente) {
      return;
    }

    this.desplazamientoPendiente = false;
    this.desplazarAlFinal();
  }

  private desplazarAlFinal(): void {
    const contenedor =
      this.contenedorMensajes?.nativeElement;

    if (!contenedor) {
      return;
    }

    contenedor.scrollTo({
      top: contenedor.scrollHeight,
      behavior: 'smooth'
    });
  }
}