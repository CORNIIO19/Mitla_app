import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  EstadoMensajeChat,
  MensajeChat,
  RolMensajeChat
} from '../../dominio/entidades/mensaje-chat.model';

/**
 * Información opcional para crear un mensaje.
 */
export interface OpcionesAgregarMensaje {
  estado?: EstadoMensajeChat;
  idBase?: number;
  nombreBase?: string;
}

/**
 * Propiedades que pueden modificarse en un mensaje existente.
 */
export interface CambiosMensajeChat {
  contenido?: string;
  estado?: EstadoMensajeChat;
  idBase?: number;
  nombreBase?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatStore {
  /*
   * Estado interno de la conversación.
   */
  private readonly mensajesSubject =
    new BehaviorSubject<MensajeChat[]>([]);

  private readonly respondiendoSubject =
    new BehaviorSubject<boolean>(false);

  private readonly errorSubject =
    new BehaviorSubject<string>('');

  private readonly idBaseSeleccionadaSubject =
    new BehaviorSubject<number | null>(null);

  /*
   * Observables públicos.
   *
   * Los componentes pueden escuchar los cambios,
   * pero no modificar directamente los BehaviorSubject.
   */
  readonly mensajes$ =
    this.mensajesSubject.asObservable();

  readonly respondiendo$ =
    this.respondiendoSubject.asObservable();

  readonly error$ =
    this.errorSubject.asObservable();

  readonly idBaseSeleccionada$ =
    this.idBaseSeleccionadaSubject.asObservable();

  /**
   * Devuelve una copia de los mensajes actuales.
   */
  obtenerMensajes(): MensajeChat[] {
    return [...this.mensajesSubject.value];
  }

  /**
   * Busca un mensaje por su identificador.
   */
  obtenerMensajePorId(
    idMensaje: string
  ): MensajeChat | undefined {
    return this.mensajesSubject.value.find(
      (mensaje) => mensaje.id === idMensaje
    );
  }

  /**
   * Devuelve el identificador de la base activa.
   */
  obtenerIdBaseSeleccionada(): number | null {
    return this.idBaseSeleccionadaSubject.value;
  }

  /**
   * Cambia la base de conocimiento activa.
   */
  seleccionarBase(
    idBase: number | null
  ): void {
    this.idBaseSeleccionadaSubject.next(idBase);
  }

  /**
   * Agrega un mensaje nuevo a la conversación.
   */
  agregarMensaje(
    rol: RolMensajeChat,
    contenido: string,
    opciones: OpcionesAgregarMensaje = {}
  ): MensajeChat {
    const mensaje: MensajeChat = {
      id: this.generarId(),
      rol,
      contenido,
      fecha: new Date(),
      estado: opciones.estado ?? 'enviado',

      ...(opciones.idBase !== undefined
        ? {
            idBase: opciones.idBase
          }
        : {}),

      ...(opciones.nombreBase !== undefined
        ? {
            nombreBase: opciones.nombreBase
          }
        : {})
    };

    this.mensajesSubject.next([
      ...this.mensajesSubject.value,
      mensaje
    ]);

    return mensaje;
  }

  /**
   * Modifica las propiedades de un mensaje existente.
   *
   * Será útil para:
   * - cambiar su estado;
   * - corregir el contenido;
   * - asociarlo con una base;
   * - actualizarlo después de un reintento.
   */
  actualizarMensaje(
    idMensaje: string,
    cambios: CambiosMensajeChat
  ): void {
    const mensajesActualizados =
      this.mensajesSubject.value.map(
        (mensaje) => {
          if (mensaje.id !== idMensaje) {
            return mensaje;
          }

          return {
            ...mensaje,
            ...cambios
          };
        }
      );

    this.mensajesSubject.next(
      mensajesActualizados
    );
  }

  /**
   * Modifica únicamente el estado de un mensaje.
   */
  actualizarEstadoMensaje(
    idMensaje: string,
    estado: EstadoMensajeChat
  ): void {
    this.actualizarMensaje(
      idMensaje,
      {
        estado
      }
    );
  }

  /**
   * Elimina un mensaje de la conversación.
   */
  eliminarMensaje(
    idMensaje: string
  ): void {
    const mensajesRestantes =
      this.mensajesSubject.value.filter(
        (mensaje) => mensaje.id !== idMensaje
      );

    this.mensajesSubject.next(
      mensajesRestantes
    );
  }

  /**
   * Indica si MITLA está generando una respuesta.
   */
  establecerRespondiendo(
    respondiendo: boolean
  ): void {
    this.respondiendoSubject.next(
      respondiendo
    );
  }

  /**
   * Guarda un mensaje de error general del chat.
   */
  establecerError(
    mensaje: string
  ): void {
    this.errorSubject.next(mensaje);
  }

  /**
   * Limpia el error general.
   */
  limpiarError(): void {
    this.errorSubject.next('');
  }

  /**
   * Elimina los mensajes y restablece los estados
   * relacionados con la conversación.
   *
   * No cambia la base seleccionada.
   */
  limpiarConversacion(): void {
    this.mensajesSubject.next([]);
    this.respondiendoSubject.next(false);
    this.errorSubject.next('');
  }

  /**
   * Reinicia completamente el chat,
   * incluyendo la base seleccionada.
   */
  reiniciarChat(): void {
    this.limpiarConversacion();

    this.idBaseSeleccionadaSubject.next(
      null
    );
  }

  /**
   * Genera un identificador local para cada mensaje.
   */
  private generarId(): string {
    return [
      Date.now().toString(36),
      Math.random().toString(36).slice(2)
    ].join('-');
  }
}