import { Component, EventEmitter, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { mat2d } from 'gl-matrix';

@Component({
  selector: 'app-controles',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './controles.html',
  styleUrl: './controles.css'
})
export class ControlesComponent {

  @Output() rotacionChange = new EventEmitter<{
    angulo: number;
    matriz: number[];
  }>();

  angulo = 0;

  matrizRotacion: number[] = [1, 0, 0, 1, 0, 0];

  cambiarRotacion(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.angulo = Number(input.value);

    this.calcularMatrizRotacion();
  }

  calcularMatrizRotacion(): void {
    const anguloRad = this.angulo * Math.PI / 180;

    const matriz = mat2d.create();

    mat2d.rotate(matriz, matriz, anguloRad);

    this.matrizRotacion = Array.from(matriz);

    this.rotacionChange.emit({
      angulo: this.angulo,
      matriz: this.matrizRotacion
    });
  }

  resetearRotacion(): void {
    this.angulo = 0;

    this.calcularMatrizRotacion();
  }
}