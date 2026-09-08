import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { mat2d } from 'gl-matrix';

@Component({
  selector: 'app-controles',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './controles.html',
  styleUrl: './controles.css',
})
export class Controles implements AfterViewInit {

  @Output() stateChange = new EventEmitter<{
    tx: number;
    ty: number;
    scale: number;
    angle: number;
  }>();

  tx = 0;
  ty = 0;
  scale = 1;

  // Mi parte: rotación
  angulo = 0;

  matrizRotacion: number[] = [1, 0, 0, 1, 0, 0];

  ngAfterViewInit(): void {
    this.calcularMatrizRotacion();
    this.emitir();
  }

  emitir(): void {
    this.stateChange.emit({
      tx: this.tx,
      ty: this.ty,
      scale: this.scale,
      angle: this.angulo
    });
  }

  cambiarRotacion(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.angulo = Number(input.value);

    this.calcularMatrizRotacion();
    this.emitir();
  }

  calcularMatrizRotacion(): void {
    const anguloRad = this.angulo * Math.PI / 180;

    const matriz = mat2d.create();

    mat2d.rotate(matriz, matriz, anguloRad);

    this.matrizRotacion = Array.from(matriz);
  }

  resetearRotacion(): void {
    this.angulo = 0;

    this.calcularMatrizRotacion();
    this.emitir();
  }
}