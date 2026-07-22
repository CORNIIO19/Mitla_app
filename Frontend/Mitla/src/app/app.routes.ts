import { Routes } from '@angular/router';
import { authGuard } from './seguridad/guards/auth.guard';

export const routes: Routes = [
  // -------------------------------------------------
  // RUTAS PÚBLICAS
  // -------------------------------------------------

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

  // -------------------------------------------------
  // ZONA PRIVADA
  // -------------------------------------------------

  {
    path: '',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./presentacion/layouts/panel/panel.layout')
        .then((m) => m.PanelLayout),

    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },

      {
        path: 'inicio',
        loadComponent: () =>
          import('./presentacion/paginas/inicio/inicio.page')
            .then((m) => m.InicioPage),
      },

      {
        path: 'bases-conocimiento',
        loadComponent: () =>
          import('./presentacion/paginas/bases-conocimiento/bases-conocimiento.page')
            .then((m) => m.BasesConocimientoPage),
      },

      {
        path: 'archivos/:idBase',
        loadComponent: () =>
          import('./presentacion/paginas/archivos/archivos.page')
            .then((m) => m.ArchivosPage),
      },

      {
        path: 'etiquetas',
        loadComponent: () =>
          import('./presentacion/paginas/etiquetas/etiquetas.page')
            .then((m) => m.EtiquetasPage),
      },

      {
        path: 'chat',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },

      {
        path: 'configuracion',
        loadComponent: () =>
          import('./presentacion/paginas/configuracion/configuracion.page')
            .then((m) => m.ConfiguracionPage),
      },

      {
        path: 'sincronizacion',
        loadComponent: () =>
          import('./presentacion/paginas/sincronizacion/sincronizacion.page')
            .then((m) => m.SincronizacionPage),
      },
    ],
  },

  // -------------------------------------------------
  // RUTA NO ENCONTRADA
  // -------------------------------------------------

  {
    path: '**',
    redirectTo: 'login',
  },
];