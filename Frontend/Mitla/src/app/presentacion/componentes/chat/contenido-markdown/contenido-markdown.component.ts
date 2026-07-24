import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import {
  DomSanitizer,
  SafeHtml
} from '@angular/platform-browser';

import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-contenido-markdown',
  standalone: true,
  templateUrl: './contenido-markdown.component.html',
  styleUrls: ['./contenido-markdown.component.scss'],

  /*
   * El contenido generado mediante innerHTML no recibe
   * automáticamente los atributos de encapsulación de Angular.
   *
   * Por eso desactivamos la encapsulación y limitamos todos
   * los estilos mediante la clase .contenido-markdown.
   */
  encapsulation: ViewEncapsulation.None
})
export class ContenidoMarkdownComponent
  implements OnChanges {

  @Input({ required: true })
  contenido = '';

  htmlSeguro: SafeHtml = '';

  constructor(
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contenido']) {
      this.renderizarContenido();
    }
  }

  private renderizarContenido(): void {
    const resultado = marked.parse(
      this.contenido ?? '',
      {
        gfm: true,
        breaks: true,
        async: false
      }
    );

    const htmlGenerado =
      typeof resultado === 'string'
        ? resultado
        : '';

    /*
     * Primero limpiamos el HTML con DOMPurify.
     * Solo después se lo entregamos a Angular.
     */
    const htmlLimpio = String(
      DOMPurify.sanitize(htmlGenerado)
    );

    this.htmlSeguro =
      this.sanitizer.bypassSecurityTrustHtml(
        htmlLimpio
      );
  }
}