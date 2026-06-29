import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./presentacion/paginas/autenticacion/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./presentacion/paginas/autenticacion/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./presentacion/paginas/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'bases-conocimiento',
    loadComponent: () => import('./presentacion/paginas/bases-conocimiento/bases-conocimiento.page').then( m => m.BasesConocimientoPage)
  },
  {
    path: 'archivos',
    loadComponent: () => import('./presentacion/paginas/archivos/archivos.page').then( m => m.ArchivosPage)
  },
  {
    path: 'etiquetas',
    loadComponent: () => import('./presentacion/paginas/etiquetas/etiquetas.page').then( m => m.EtiquetasPage)
  },
  {
    path: 'chat',
    loadComponent: () => import('./presentacion/paginas/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./presentacion/paginas/configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
  {
    path: 'sincronizacion',
    loadComponent: () => import('./presentacion/paginas/sincronizacion/sincronizacion.page').then( m => m.SincronizacionPage)
  },
];
