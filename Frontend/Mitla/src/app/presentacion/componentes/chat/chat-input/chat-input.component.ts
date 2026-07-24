import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-chat-input',
  standalone: true,
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent
  implements AfterViewInit, OnChanges {

  @ViewChild('campoMensaje')
  private campoMensaje?: ElementRef<HTMLTextAreaElement>;

  @Input()
  valor = '';

  @Input()
  placeholder =
    'Pregunta algo sobre tus bases de conocimiento...';

  @Input()
  deshabilitado = false;

  @Output()
  readonly valorChange = new EventEmitter<string>();

  @Output()
  readonly enviar = new EventEmitter<void>();

  ngAfterViewInit(): void {
    this.actualizarAlturaCampo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valor']) {
      setTimeout(() => {
        this.actualizarAlturaCampo();
      });
    }
  }

  actualizarValor(event: Event): void {
    const textarea =
      event.target as HTMLTextAreaElement;

    this.valorChange.emit(textarea.value);
    this.ajustarAltura(textarea);
  }

  manejarTeclado(event: KeyboardEvent): void {
    // No interferir mientras el usuario utiliza
    // un método de entrada o composición de texto.
    if (event.isComposing) {
      return;
    }

    // Shift + Enter conserva el comportamiento normal
    // y crea una nueva línea.
    if (event.key !== 'Enter' || event.shiftKey) {
      return;
    }

    event.preventDefault();
    this.solicitarEnvio();
  }

  solicitarEnvio(): void {
    if (
      this.deshabilitado ||
      !this.valor.trim()
    ) {
      return;
    }

    this.enviar.emit();

    // Esperamos a que el componente padre limpie
    // el valor antes de restablecer la altura.
    setTimeout(() => {
      this.actualizarAlturaCampo();
    });
  }

  private actualizarAlturaCampo(): void {
    const textarea =
      this.campoMensaje?.nativeElement;

    if (!textarea) {
      return;
    }

    this.ajustarAltura(textarea);
  }

  private ajustarAltura(
    textarea: HTMLTextAreaElement
  ): void {
    const alturaMaxima = 180;

    textarea.style.height = 'auto';

    textarea.style.height =
      `${Math.min(
        textarea.scrollHeight,
        alturaMaxima
      )}px`;
  }
}