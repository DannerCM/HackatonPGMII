import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { mat2d } from 'gl-matrix';
import { TransformState } from '../transform.model';

@Component({
  selector: 'app-controles',
  imports: [DecimalPipe],
  templateUrl: './controles.html',
  styleUrl: './controles.css',
})
export class Controles implements AfterViewInit {
  @Input() state: TransformState | null = null;
  @Input() matrix: number[] | null = null;
  @Output() stateChange = new EventEmitter<{
    tx: number;
    ty: number;
    scale: number;
    angle: number;
  }>();
  @Output() flipXChange = new EventEmitter<boolean>();
  @Output() flipYChange = new EventEmitter<boolean>();

  tx = 0;
  ty = 0;
  scale = 1;

  // Parte de Est2: rotación
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
      angle: this.angulo,
    });
  }

  cambiarRotacion(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.angulo = Number(input.value);
    this.calcularMatrizRotacion();
    this.emitir();
  }

  resetearRotacion(): void {
    this.angulo = 0;
    this.calcularMatrizRotacion();
    this.emitir();
  }

  calcularMatrizRotacion(): void {
    const anguloRad = (this.angulo * Math.PI) / 180;
    const matriz = mat2d.create();
    mat2d.rotate(matriz, matriz, anguloRad);
    this.matrizRotacion = Array.from(matriz);
  }

  toggleFlipX(): void {
    this.flipXChange.emit(!this.state?.flipX);
  }

  toggleFlipY(): void {
    this.flipYChange.emit(!this.state?.flipY);
  }

  rows(): number[][] {
    if (!this.matrix || this.matrix.length < 16) {
      return [];
    }
    const out: number[][] = [];
    for (let r = 0; r < 4; r++) {
      out.push(this.matrix.slice(r * 4, r * 4 + 4));
    }
    return out;
  }
}