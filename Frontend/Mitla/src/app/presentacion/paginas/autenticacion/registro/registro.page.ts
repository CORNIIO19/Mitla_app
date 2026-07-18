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

import { RegistrarUsuarioUseCase } from '../../../../aplicacion/casos-uso/registrar-usuario.usecase';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
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
export class RegistroPage {
  nombre = '';
  email = '';
  telefono = '';
  password = '';
  confirmarPassword = '';

  cargando = false;
  error = '';
  mensaje = '';

  constructor(
    private registrarUsuarioUseCase: RegistrarUsuarioUseCase,
    private router: Router
  ) {}

  registrar(): void {
    this.error = '';
    this.mensaje = '';

    const nombreLimpio = this.nombre.trim();
    const emailLimpio = this.email.trim();
    const telefonoLimpio = this.telefono.trim();

    if (!nombreLimpio || !emailLimpio || !telefonoLimpio || !this.password) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.password !== this.confirmarPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.cargando = true;

    this.registrarUsuarioUseCase.ejecutar({
      nombre: nombreLimpio,
      email: emailLimpio,
      telefono: telefonoLimpio,
      password: this.password
    }).subscribe({
      next: () => {
        this.cargando = false;
        this.mensaje = 'Cuenta creada correctamente. Ahora puedes iniciar sesión.';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        console.error(error);

        this.cargando = false;

        if (error.status === 409) {
          this.error = 'Ya existe una cuenta con ese correo.';
          return;
        }

        this.error = 'No se pudo crear la cuenta. Intenta nuevamente.';
      }
    });
  }
}