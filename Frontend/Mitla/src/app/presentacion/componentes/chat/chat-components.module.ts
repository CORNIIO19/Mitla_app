import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatBienvenidaComponent } from './chat-bienvenida/chat-bienvenida.component';
import { ChatConversacionComponent } from './chat-conversacion/chat-conversacion.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { HistorialConversacionesComponent } from './historial-conversaciones/historial-conversaciones.component';
import { MensajeModeloComponent } from './mensaje-modelo/mensaje-modelo.component';
import { MensajeUsuarioComponent } from './mensaje-usuario/mensaje-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    ChatBienvenidaComponent,
    ChatConversacionComponent,
    ChatInputComponent,
    HistorialConversacionesComponent,
    MensajeModeloComponent,
    MensajeUsuarioComponent
  ],
  exports: [
    ChatBienvenidaComponent,
    ChatConversacionComponent,
    ChatInputComponent,
    HistorialConversacionesComponent,
    MensajeModeloComponent,
    MensajeUsuarioComponent
  ]
})
export class ChatComponentsModule {}