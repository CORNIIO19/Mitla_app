import { CommonModule } from '@angular/common';

import {
  Component,
  DestroyRef,
  OnInit,
  inject
} from '@angular/core';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  finalize
} from 'rxjs';

import {
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';

import { TokenService } from
  '../../../seguridad/servicios/token.service';

import { ListarBasesUseCase } from
  '../../../aplicacion/casos-uso/listar-bases.usecase';

import { EnviarPreguntaUseCase } from
  '../../../aplicacion/casos-uso/enviar-pregunta.usecase';

import { ChatStore } from
  '../../../aplicacion/estado/chat.store';

import { BaseConocimiento } from
  '../../../dominio/entidades/base-conocimiento.model';

import { MensajeChat } from
  '../../../dominio/entidades/mensaje-chat.model';

import { Usuario } from
  '../../../dominio/entidades/usuario.model';

import { EstadoCargaComponent } from
  '../../componentes/estado-carga/estado-carga.component';

import { MensajeAlertaComponent } from
  '../../componentes/mensaje-alerta/mensaje-alerta.component';

import { ChatConversacionComponent } from
  '../../componentes/chat/chat-conversacion/chat-conversacion.component';

import { ChatInputComponent } from
  '../../componentes/chat/chat-input/chat-input.component';

import { SelectorBaseComponent } from
  '../../componentes/chat/selector-base/selector-base.component';

/**
 * Conserva la información necesaria para volver
 * a ejecutar una consulta que haya fallado.
 */
interface ConsultaChatFallida {
  pregunta: string;
  idBase: number;
  nombreBase: string;
  idMensajeUsuario: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [
    CommonModule,
    EstadoCargaComponent,
    MensajeAlertaComponent,
    ChatConversacionComponent,
    ChatInputComponent,
    SelectorBaseComponent
  ]
})
export class InicioPage implements OnInit {
  /**
   * Permite cancelar automáticamente las suscripciones
   * cuando Angular destruya la página.
   */
  private readonly destroyRef =
    inject(DestroyRef);

  usuario: Usuario | null = null;

  bases: BaseConocimiento[] = [];

  /**
   * Estados generales del dashboard.
   */
  cargando = false;
  error = '';

  /**
   * Estado del chat.
   */
  pregunta = '';
  mensajesChat: MensajeChat[] = [];
  respondiendo = false;

  idBaseSeleccionada: number | null = null;

  /**
   * Error específico producido al consultar MITLA.
   */
  errorChat = '';

  /**
   * Consulta que se podrá volver a ejecutar.
   */
  consultaFallida: ConsultaChatFallida | null =
    null;

  constructor(
    private readonly tokenService:
      TokenService,

    private readonly listarBasesUseCase:
      ListarBasesUseCase,

    private readonly enviarPreguntaUseCase:
      EnviarPreguntaUseCase,

    private readonly chatStore:
      ChatStore
  ) {}

  ngOnInit(): void {
    this.usuario =
      this.tokenService.obtenerUsuario<Usuario>();

    /*
     * Escucha los mensajes administrados por ChatStore.
     */
    this.chatStore.mensajes$
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((mensajes) => {
        this.mensajesChat = mensajes;
      });

    /*
     * Escucha si actualmente hay una petición
     * en proceso.
     */
    this.chatStore.respondiendo$
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((respondiendo) => {
        this.respondiendo = respondiendo;
      });

    /*
     * Escucha la base de conocimiento seleccionada.
     */
    this.chatStore.idBaseSeleccionada$
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((idBase) => {
        this.idBaseSeleccionada = idBase;
      });

    this.cargarResumen();
  }

  /**
   * Carga las bases de conocimiento del usuario.
   */
  cargarResumen(): void {
    this.cargando = true;
    this.error = '';

    this.listarBasesUseCase
      .ejecutar()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (bases) => {
          this.bases = bases;
          this.cargando = false;
        },

        error: (error: unknown) => {
          console.error(
            'No se pudieron cargar las bases:',
            error
          );

          this.error =
            'No se pudo cargar la información del dashboard.';

          this.cargando = false;
        }
      });
  }

  /**
   * Inicial utilizada para representar al usuario
   * dentro de la conversación.
   */
  get inicialUsuario(): string {
    const nombre =
      this.usuario?.nombre?.trim();

    return nombre
      ? nombre.charAt(0).toUpperCase()
      : 'U';
  }

  /**
   * Indica si ya existe al menos un mensaje.
   */
  get chatIniciado(): boolean {
    return this.mensajesChat.length > 0;
  }

  /**
   * Cambia la base activa del chat.
   */
  seleccionarBase(
    valor: number | string | null
  ): void {
    const idBase =
      valor === null || valor === ''
        ? null
        : Number(valor);

    const idBaseValido =
      idBase !== null &&
      Number.isInteger(idBase) &&
      idBase > 0;

    this.chatStore.seleccionarBase(
      idBaseValido
        ? idBase
        : null
    );

    this.error = '';
    this.errorChat = '';
  }

  /**
   * Valida la pregunta, agrega el mensaje del usuario
   * y comienza la consulta.
   */
  enviarPregunta(): void {
    const texto = this.pregunta.trim();
    const idBase = this.idBaseSeleccionada;

    /*
     * Evita preguntas vacías y envíos duplicados.
     */
    if (!texto || this.respondiendo) {
      return;
    }

    if (
      idBase === null ||
      !Number.isInteger(idBase) ||
      idBase <= 0
    ) {
      this.error =
        'Selecciona una base de conocimiento.';

      return;
    }

    const baseSeleccionada =
      this.bases.find(
        (base) => base.id_base === idBase
      );

    if (!baseSeleccionada) {
      this.error =
        'No se pudo encontrar la base de conocimiento seleccionada.';

      return;
    }

    this.error = '';
    this.errorChat = '';
    this.consultaFallida = null;

    /**
     * El mensaje comienza con estado "enviando".
     *
     * Si la petición termina correctamente cambiará
     * a "enviado".
     *
     * Si falla cambiará a "error".
     */
    const mensajeUsuario =
      this.chatStore.agregarMensaje(
        'usuario',
        texto,
        {
          estado: 'enviando',
          idBase,
          nombreBase: baseSeleccionada.nombre
        }
      );

    /*
     * Limpiamos el input después de conservar
     * la pregunta dentro de texto.
     */
    this.pregunta = '';

    this.ejecutarConsulta({
      pregunta: texto,
      idBase,
      nombreBase: baseSeleccionada.nombre,
      idMensajeUsuario: mensajeUsuario.id
    });
  }

  /**
   * Ejecuta realmente el caso de uso.
   *
   * Se utiliza tanto para una pregunta nueva
   * como para volver a intentar una consulta fallida.
   */
  private ejecutarConsulta(
    consulta: ConsultaChatFallida
  ): void {
    this.errorChat = '';

    this.chatStore.establecerRespondiendo(
      true
    );

    this.enviarPreguntaUseCase
      .ejecutar({
        /*
         * Estos nombres coinciden exactamente
         * con el JSON esperado por Flask.
         */
        id_base: consulta.idBase,
        pregunta: consulta.pregunta
      })
      .pipe(
        /*
         * Se ejecuta tanto si la petición termina bien
         * como si produce un error.
         */
        finalize(() => {
          this.chatStore.establecerRespondiendo(
            false
          );
        }),

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (respuesta) => {
          /*
           * La pregunta del usuario se marca
           * como enviada.
           */
          this.chatStore.actualizarEstadoMensaje(
            consulta.idMensajeUsuario,
            'enviado'
          );

          /*
           * El backend responde con:
           *
           * respuesta.respuesta
           * respuesta.id_base
           * respuesta.nombre_base
           * respuesta.fuentes
           * respuesta.modo
           */
          this.chatStore.agregarMensaje(
            'asistente',
            respuesta.respuesta,
            {
              estado: 'enviado',

              /*
               * Utilizamos los datos devueltos por
               * el backend como fuente de verdad.
               */
              idBase: respuesta.id_base,
              nombreBase: respuesta.nombre_base
            }
          );

          this.consultaFallida = null;
          this.errorChat = '';
        },

        error: (error: unknown) => {
          console.error(
            'No se pudo obtener una respuesta de MITLA:',
            error
          );

          /*
           * La pregunta se marca como fallida.
           */
          this.chatStore.actualizarEstadoMensaje(
            consulta.idMensajeUsuario,
            'error'
          );

          /*
           * Conservamos la información para reintentar
           * sin crear otra burbuja del usuario.
           */
          this.consultaFallida = {
            ...consulta
          };

          this.errorChat =
            this.obtenerMensajeErrorChat(error);
        }
      });
  }

  /**
   * Ejecuta nuevamente la última consulta fallida.
   *
   * No agrega otro mensaje del usuario.
   */
  reintentarPregunta(): void {
    if (
      !this.consultaFallida ||
      this.respondiendo
    ) {
      return;
    }

    const consulta = {
      ...this.consultaFallida
    };

    this.errorChat = '';

    this.chatStore.actualizarEstadoMensaje(
      consulta.idMensajeUsuario,
      'enviando'
    );

    this.ejecutarConsulta(consulta);
  }

  /**
   * Permite cerrar manualmente el mensaje de error
   * sin eliminar la pregunta de la conversación.
   */
  cerrarErrorChat(): void {
    this.errorChat = '';
  }

  /**
   * Traduce los errores HTTP del endpoint
   * a mensajes comprensibles para el usuario.
   */
  private obtenerMensajeErrorChat(
    error: unknown
  ): string {
    if (error instanceof HttpErrorResponse) {
      /*
       * Flask devuelve errores con esta estructura:
       *
       * {
       *   "error": "La pregunta no puede estar vacía."
       * }
       */
      const mensajeBackend =
        typeof error.error?.error === 'string'
          ? error.error.error.trim()
          : '';

      if (mensajeBackend) {
        return mensajeBackend;
      }

      switch (error.status) {
        case 0:
          return 'No fue posible conectarse con el servidor de MITLA.';

        case 400:
          return 'La pregunta o la base seleccionada no son válidas.';

        case 401:
          return 'La sesión no es válida o ha expirado.';

        case 404:
          return 'La base seleccionada no existe o no te pertenece.';

        case 500:
          return 'El servidor no pudo procesar la pregunta.';

        default:
          return 'No se pudo obtener una respuesta de MITLA.';
      }
    }

    if (
      error instanceof Error &&
      error.message.trim()
    ) {
      return error.message;
    }

    return 'No se pudo obtener una respuesta de MITLA.';
  }
}