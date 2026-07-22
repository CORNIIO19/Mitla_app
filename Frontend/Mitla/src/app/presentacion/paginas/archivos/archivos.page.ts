import { Component, DestroyRef, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {distinctUntilChanged, map} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {VisorNotaComponent} from '../../componentes/visor-nota/visor-nota.component';
// import { BarraSuperiorComponent } from '../../componentes/barra-superior/barra-superior.component';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
} from '@ionic/angular/standalone';

import { Archivo } from '../../../dominio/entidades/archivo.model';
import { ListarArchivosUseCase } from '../../../aplicacion/casos-uso/listar-archivos.usecase';
import { SubirArchivoUseCase } from '../../../aplicacion/casos-uso/subir-archivo.usecase';
import { ObtenerArchivoUseCase } from '../../../aplicacion/casos-uso/obtener-archivo.usecase';
import { EliminarArchivoUseCase } from '../../../aplicacion/casos-uso/eliminar-archivo.usecase';
import { TarjetaArchivoComponent } from '../../componentes/tarjeta-archivo/tarjeta-archivo.component';
import { EstadoCargaComponent } from '../../componentes/estado-carga/estado-carga.component';
import { EstadoVacioComponent } from '../../componentes/estado-vacio/estado-vacio.component';
import { MensajeAlertaComponent } from '../../componentes/mensaje-alerta/mensaje-alerta.component';
@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.page.html',
  styleUrls: ['./archivos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    // IonHeader,
    // IonTitle,
    // IonToolbar,
    // IonButtons,
    // IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonText,
    // IonList,
    // IonItem,
    // IonLabel,
    // IonSpinner,
    // BarraSuperiorComponent,
    TarjetaArchivoComponent,
    EstadoCargaComponent,
    EstadoVacioComponent,
    MensajeAlertaComponent,
    VisorNotaComponent
  ]
})
export class ArchivosPage implements OnInit{
  idBase = 0;

  archivos: Archivo[] = [];
  archivoSeleccionado: File | null = null;
  archivoAbierto: Archivo | null = null;

  cargando = false;
  subiendo = false;

  error = '';
  mensaje = '';

  private readonly destroyRef = inject(DestroyRef);

@ViewChild('inputArchivo')
inputArchivo?: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private listarArchivosUseCase: ListarArchivosUseCase,
    private subirArchivoUseCase: SubirArchivoUseCase,
    private obtenerArchivoUseCase: ObtenerArchivoUseCase,
    private eliminarArchivoUseCase: EliminarArchivoUseCase
  ) {}

  ngOnInit(): void {
  this.route.paramMap
    .pipe(
      map((parametros) => {
        return Number(parametros.get('idBase'));
      }),

      distinctUntilChanged(),

      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe((idBase) => {
      this.prepararBase(idBase);
    });
}

  cargarArchivos(): void {
    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    this.listarArchivosUseCase.ejecutar(this.idBase).subscribe({
      next: (archivos) => {
        this.archivos = archivos;
        this.cargando = false;
      },
      error: (error) => {
        console.error(error);
        this.error = 'No se pudieron cargar los archivos.';
        this.cargando = false;
      }
    });
  }

  seleccionarArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.archivoSeleccionado = input.files?.[0] ?? null;
  }

  subirArchivo(): void {
    this.error = '';
    this.mensaje = '';

      if (
    !Number.isInteger(this.idBase) ||
    this.idBase <= 0
  ) {
    this.error =
      'No hay una base válida seleccionada para subir el archivo.';

    return;
  }

    if (!this.archivoSeleccionado) {
      this.error = 'Selecciona un archivo antes de subirlo.';
      return;
    }

    this.subiendo = true;

    try {
      this.subirArchivoUseCase.ejecutar({
        idBase: this.idBase,
        archivo: this.archivoSeleccionado
      }).subscribe({
        next: () => {
          this.mensaje = 'Archivo subido correctamente.';
          this.archivoSeleccionado = null;
          this.subiendo = false;

          this.cargarArchivos();
        },
        error: (error) => {
          console.error(error);
          this.error = 'No se pudo subir el archivo.';
          this.subiendo = false;
        }
      });
    } catch (error) {
      console.error(error);
      this.error = 'Tipo de archivo no permitido.';
      this.subiendo = false;
    }
  }

  abrirArchivo(archivo: Archivo): void {
    this.error = '';
    this.mensaje = '';

    this.obtenerArchivoUseCase.ejecutar(archivo.id_archivo).subscribe({
      next: (archivoCompleto) => {
        this.archivoAbierto = archivoCompleto;
      },
      error: (error) => {
        console.error(error);
        this.error = 'No se pudo abrir el archivo.';
      }
    });
  }

eliminarArchivo(archivo: Archivo): void {
  const confirmar = confirm(`¿Eliminar el archivo "${archivo.nombre_archivo}"?`);

  if (!confirmar) {
    return;
  }

  this.eliminarArchivoUseCase.ejecutar(archivo.id_archivo).subscribe({
    next: () => {
      this.mensaje = 'Archivo eliminado correctamente.';
      this.archivoAbierto = null;
      this.cargarArchivos();
    },
    error: (error) => {
      console.error(error);
      this.error = 'No se pudo eliminar el archivo.';
    }
  });
}
private prepararBase(idBase: number): void {
  this.error = '';
  this.mensaje = '';

  this.archivos = [];
  this.archivoAbierto = null;
  this.archivoSeleccionado = null;

  const idValido =
    Number.isInteger(idBase) &&
    idBase > 0;

  if (!idValido) {
    this.idBase = 0;

    this.error =
      'No se recibió una base de conocimiento válida.';

    return;
  }

  this.idBase = idBase;

  this.cargarArchivos();
}

}
