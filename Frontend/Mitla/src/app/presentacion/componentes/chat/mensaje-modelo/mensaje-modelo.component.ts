import { CommonModule } from '@angular/common';

import {
  Component,
  Input,
  OnDestroy
} from '@angular/core';

import { MensajeChat } from
  '../../../../dominio/entidades/mensaje-chat.model';

import { ContenidoMarkdownComponent } from
  '../contenido-markdown/contenido-markdown.component';

@Component({
  selector: 'app-mensaje-modelo',
  standalone: true,
  templateUrl: './mensaje-modelo.component.html',
  styleUrls: ['./mensaje-modelo.component.scss'],
  imports: [
    CommonModule,
    ContenidoMarkdownComponent
  ]
})
export class MensajeModeloComponent implements OnDestroy {
  @Input({ required: true })
  mensaje!: MensajeChat;

  copiado = false;

  private temporizadorCopiado?: number;

  async copiarRespuesta(): Promise<void> {
    const contenido = this.mensaje?.contenido?.trim();

    if (!contenido) {
      return;
    }

    try {
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard
      ) {
        await navigator.clipboard.writeText(contenido);
      } else {
        this.copiarConMetodoAlternativo(contenido);
      }

      this.mostrarConfirmacionCopiado();
    } catch (error) {
      console.error(
        'No se pudo copiar la respuesta con Clipboard API:',
        error
      );

      try {
        this.copiarConMetodoAlternativo(contenido);
        this.mostrarConfirmacionCopiado();
      } catch (errorAlternativo) {
        console.error(
          'No se pudo copiar la respuesta:',
          errorAlternativo
        );
      }
    }
  }

  ngOnDestroy(): void {
    if (this.temporizadorCopiado !== undefined) {
      window.clearTimeout(this.temporizadorCopiado);
    }
  }

  private mostrarConfirmacionCopiado(): void {
    this.copiado = true;

    if (this.temporizadorCopiado !== undefined) {
      window.clearTimeout(this.temporizadorCopiado);
    }

    this.temporizadorCopiado = window.setTimeout(
      () => {
        this.copiado = false;
      },
      1800
    );
  }

  private copiarConMetodoAlternativo(
    contenido: string
  ): void {
    const textarea =
      document.createElement('textarea');

    textarea.value = contenido;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(
      0,
      textarea.value.length
    );

    const copiado =
      document.execCommand('copy');

    document.body.removeChild(textarea);

    if (!copiado) {
      throw new Error(
        'El navegador rechazó la operación de copiado.'
      );
    }
  }
}