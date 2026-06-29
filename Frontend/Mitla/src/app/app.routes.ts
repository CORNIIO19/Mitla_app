import { Routes } from '@angular/router';
import { authGuard } from './seguridad/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Rutas públicas
  {
    path: 'login',
    loadComponent: () =>
      import('./presentacion/paginas/autenticacion/login/login.page')
        .then((m) => m.LoginPage),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./presentacion/paginas/autenticacion/registro/registro.page')
        .then((m) => m.RegistroPage),
  },

  // Rutas privadas
  {
    path: 'inicio',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./presentacion/paginas/inicio/inicio.page')
        .then((m) => m.InicioPage),
  },
  {
    path: 'bases-conocimiento',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./presentacion/paginas/bases-conocimiento/bases-conocimiento.page')
        .then((m) => m.BasesConocimientoPage),
  },
  {
    path: 'archivos/:idBase',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./presentacion/paginas/archivos/archivos.page')
        .then((m) => m.ArchivosPage),
  },
  {
    path: 'etiquetas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./presentacion/paginas/etiquetas/etiquetas.page')
        .then((m) => m.EtiquetasPage),
  },
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./presentacion/paginas/chat/chat.page')
        .then((m) => m.ChatPage),
  },
  {
    path: 'configuracion',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./presentacion/paginas/configuracion/configuracion.page')
        .then((m) => m.ConfiguracionPage),
  },
  {
    path: 'sincronizacion',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./presentacion/paginas/sincronizacion/sincronizacion.page')
        .then((m) => m.SincronizacionPage),
  },

  //si el usuario entra a una ruta que no existe lo redirige a login
  {
    path: '**',
    redirectTo: 'login',
  },
];