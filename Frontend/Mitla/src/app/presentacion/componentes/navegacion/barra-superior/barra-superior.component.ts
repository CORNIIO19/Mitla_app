import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { TokenService } from '../../../../seguridad/servicios/token.service';
import { Usuario } from '../../../../dominio/entidades/usuario.model';
import { IonText, IonButton, IonButtons, IonToolbar, IonHeader, IonBackButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-barra-superior',
  standalone: true,
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss'],
  imports: [IonBackButton, IonHeader, IonToolbar, IonButtons, IonButton, IonText, 
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class BarraSuperiorComponent {
  @Input() titulo = 'Mitla';

  @Input() mostrarVolver = false;

  @Input() rutaVolver = '/inicio';

  @Input() mostrarCerrarSesion = true;

  @Input() mostrarBuscador = true;

  usuario: Usuario | null = null;

  terminoBusqueda = '';

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {
    this.usuario =
      this.tokenService.obtenerUsuario<Usuario>();
  }

  get inicialUsuario(): string {
    const nombre = this.usuario?.nombre?.trim();

    return nombre
      ? nombre.charAt(0).toUpperCase()
      : 'U';
  }

  volver(): void {
    this.router.navigateByUrl(this.rutaVolver);
  }

  cerrarSesion(): void {
    this.tokenService.limpiarSesion();

    this.router.navigate(['/login'], {
      replaceUrl: true
    });
  }
}