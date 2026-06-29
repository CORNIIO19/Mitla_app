import { ApplicationConfig } from '@angular/core';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app.routes';
import { tokenInterceptor } from './seguridad/interceptors/token.interceptor';


// Imports de infraestructura

import { UsuarioRepositorio } from './dominio/repositorios/usuario.repositorio';
import { BaseConocimientoRepositorio } from './dominio/repositorios/base-conocimiento.repositorio';
import { ArchivoRepositorio } from './dominio/repositorios/archivo.repositorio';

import { UsuarioApiRepositorio } from './infraestructura/api/usuario-api.repositorio';
import { BaseApiRepositorio } from './infraestructura/api/base-api.repositorio';
import { ArchivoApiRepositorio } from './infraestructura/api/archivo-api.repositorio';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },

    provideIonicAngular(),

    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    ),

    provideHttpClient(
      withInterceptors([tokenInterceptor])
    ),

    {
      provide: UsuarioRepositorio,
      useClass: UsuarioApiRepositorio
    },
    {
      provide: BaseConocimientoRepositorio,
      useClass: BaseApiRepositorio
    },
    {
      provide: ArchivoRepositorio,
      useClass: ArchivoApiRepositorio
    }

  ]
};