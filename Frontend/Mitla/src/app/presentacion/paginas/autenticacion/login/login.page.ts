import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel
} from '@ionic/angular/standalone';

import { AutenticarUsuarioUseCase } from '../../../../aplicacion/casos-uso/autenticar-usuario.usecase';
import { TokenService } from '../../../../seguridad/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonLabel
  ]
})
export class LoginPage {
  email = '';
  password = '';

  cargando = false;
  error = '';

  constructor(
    private autenticarUsuarioUseCase: AutenticarUsuarioUseCase,
    private tokenService: TokenService,
    private router: Router
  ) {}

  iniciarSesion(): void {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Ingresa tu correo y contraseña.';
      return;
    }

    this.cargando = true;

    this.autenticarUsuarioUseCase.ejecutar({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (respuesta) => {
        this.tokenService.guardarToken(respuesta.access_token);
        this.tokenService.guardarUsuario(respuesta.usuario);

        this.cargando = false;

        // this.router.navigate(['/inicio']);
        this.router.navigate(['/bases-conocimiento']);
      },
      error: (error) => {
        console.error(error);

        this.cargando = false;
        this.error = 'No se pudo iniciar sesión. Revisa tus datos.';
      }
    });
  }
}