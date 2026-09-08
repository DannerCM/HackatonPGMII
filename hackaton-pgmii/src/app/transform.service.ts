import { Injectable, computed, signal } from '@angular/core';
import { mat2d } from 'gl-matrix';
import { TransformState } from './transform.model';

const DEFAULT_STATE: TransformState = {
  tx: 0,
  ty: 0,
  scale: 1,
  angle: 0,
  flipX: false,
  flipY: false
};

@Injectable({ providedIn: 'root' })
export class TransformService {
  readonly state = signal<TransformState>({ ...DEFAULT_STATE });

  readonly matrix = computed<mat2d>(() => this.buildMatrix(this.state()));

  updateState(patch: Partial<TransformState>): void {
    this.state.update((s) => ({ ...s, ...patch }));
  }

  toggleFlipX(): void {
    this.state.update((s) => ({ ...s, flipX: !s.flipX }));
  }

  toggleFlipY(): void {
    this.state.update((s) => ({ ...s, flipY: !s.flipY }));
  }

  private buildMatrix(s: TransformState): mat2d {
    const m = mat2d.create();
    mat2d.translate(m, m, [s.tx, s.ty]);
    mat2d.rotate(m, m, (s.angle * Math.PI) / 180);
    mat2d.scale(m, m, [s.scale * (s.flipX ? -1 : 1), s.scale * (s.flipY ? -1 : 1)]);
    return m;
  }
}