import { Component } from '@angular/core';
import { Figura } from './figura/figura';
import { Controles } from './controles/controles';
import { TransformState } from './transform.model';

@Component({
  selector: 'app-root',
  imports: [Figura, Controles],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  state: TransformState = {
    tx: 0,
    ty: 0,
    scale: 1,
    angle: 0,
    flipX: false,
    flipY: false,
  };

  matrix: number[] = [];

  onMatrixChange(m: number[]): void {
    this.matrix = m;
  }

  toggleFlipX(): void {
    this.state = { ...this.state, flipX: !this.state.flipX };
  }

  toggleFlipY(): void {
    this.state = { ...this.state, flipY: !this.state.flipY };
  }
}