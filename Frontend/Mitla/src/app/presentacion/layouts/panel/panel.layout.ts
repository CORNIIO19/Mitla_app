import {
  Component,
  DestroyRef,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet
} from '@angular/router';

import { filter } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  BarraSuperiorComponent
} from '../../componentes/navegacion/barra-superior/barra-superior.component';

import {
  BarraLateralComponent
} from '../../componentes/navegacion/barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-panel-layout',
  standalone: true,
  templateUrl: './panel.layout.html',
  styleUrls: ['./panel.layout.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    BarraSuperiorComponent,
    BarraLateralComponent
  ]
})
export class PanelLayout implements OnInit {
  tituloActual = 'Mitla';

  mostrarVolver = false;

  rutaVolver = '/inicio';

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actualizarDatosDeRuta();

    this.router.events
      .pipe(
        filter(
          (evento): evento is NavigationEnd =>
            evento instanceof NavigationEnd
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.actualizarDatosDeRuta();
      });
  }

  private actualizarDatosDeRuta(): void {
    let rutaActiva = this.activatedRoute;

    while (rutaActiva.firstChild) {
      rutaActiva = rutaActiva.firstChild;
    }

    const datos = rutaActiva.snapshot.data;

    this.tituloActual =
      datos['titulo'] ?? 'Mitla';

    this.mostrarVolver =
      datos['mostrarVolver'] ?? false;

    this.rutaVolver =
      datos['rutaVolver'] ?? '/inicio';
  }
}