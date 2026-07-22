import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ChatComponentsModule } from '../../chat/chat-components.module';
import type { ConversacionReciente } from '../../chat/chat.types';

interface OpcionNavegacion {
  texto: string;
  ruta: string;
  activaEn: string[];
}

@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, ChatComponentsModule]
})
export class BarraLateralComponent {
  opcionesNavegacion: OpcionNavegacion[] = [
    { texto: 'Inicio', ruta: '/inicio', activaEn: ['/inicio']},
    { texto: 'Bases', ruta: '/bases-conocimiento', activaEn: ['/bases-conocimiento']},
    { texto: 'Archivos', ruta: '/bases-conocimiento', activaEn: ['/archivos']},
    // { texto: 'Chat', ruta: '/inicio', activaEn },
    { texto: 'Sincronización', ruta: '/sincronizacion', activaEn: ['/sincronizacion']},
    { texto: 'Configuración', ruta: '/configuracion', activaEn: ['/configuracion']},
  ];

  conversacionesRecientes: ConversacionReciente[] = [
    {
      id: 1,
      titulo: 'Resumen de sistemas operativos',
      base: 'Sistemas Operativos',
      fecha: 'Hoy'
    },
    {
      id: 2,
      titulo: 'Conceptos de redes',
      base: 'Redes',
      fecha: 'Ayer'
    },
    {
      id: 3,
      titulo: 'Preguntas para examen',
      base: 'Base académica',
      fecha: 'Reciente'
    }
  ];

  constructor(private router: Router) {}

  abrirConversacion(): void {
    this.router.navigate(['/chat']);
  }

  estaActiva(opcion: OpcionNavegacion): boolean {
  const rutaActual = this.router.url
    .split('?')[0]
    .split('#')[0];

  return opcion.activaEn.some((ruta) => {
    return rutaActual === ruta ||
      rutaActual.startsWith(`${ruta}/`);
  });
}

}
