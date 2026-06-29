import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { TokenService } from '../servicios/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.obtenerToken();

  const requestConToken = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(requestConToken).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        tokenService.limpiarSesion();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};