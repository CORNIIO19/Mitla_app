import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FraseCarrusel {
  texto: string;
  autor: string;
}

@Component({
  selector: 'app-carrusel-frases',
  templateUrl: './carrusel-frases.component.html',
  styleUrls: ['./carrusel-frases.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class CarruselFrasesComponent implements OnInit, OnDestroy {
  @Input() frases: FraseCarrusel[] = [];
  @Input() intervalo = 6000;

  indiceActual = 0;
  animando = false;

  private temporizador: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.iniciarCarrusel();
  }

  ngOnDestroy(): void {
    this.detenerCarrusel();
  }

  get fraseActual(): FraseCarrusel | null {
    if (this.frases.length === 0) {
      return null;
    }

    return this.frases[this.indiceActual];
  }

  private iniciarCarrusel(): void {
    if (this.frases.length <= 1) {
      return;
    }

    this.temporizador = setInterval(() => {
      this.cambiarFrase();
    }, this.intervalo);
  }

  private cambiarFrase(): void {
    this.animando = true;

    setTimeout(() => {
      this.indiceActual = (this.indiceActual + 1) % this.frases.length;
      this.animando = false;
    }, 250);
  }

  private detenerCarrusel(): void {
    if (this.temporizador) {
      clearInterval(this.temporizador);
      this.temporizador = null;
    }
  }
}