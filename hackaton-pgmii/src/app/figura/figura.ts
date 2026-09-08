import {
  Component,
  Input,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { StageComponent, CoreShapeComponent } from 'ng2-konva';
import { mat4, vec4 } from 'gl-matrix';
import { TransformState } from '../transform.model';

@Component({
  selector: 'app-figura',
  imports: [StageComponent, CoreShapeComponent],
  templateUrl: './figura.html',
  styleUrl: './figura.css',
})
export class Figura implements AfterViewInit, OnChanges {
  @Input() state: TransformState | null = null;
  @Output() matrixChange = new EventEmitter<number[]>();
  @ViewChildren('cara', { read: CoreShapeComponent })
  caras?: QueryList<CoreShapeComponent>;

  readonly stageConfig = { width: 600, height: 450 };
  readonly caraConfig = { closed: true };

  private readonly base = 95;
  private readonly viewX = (Math.atan(1 / Math.SQRT2) * -1);
  private readonly viewY = Math.PI / 4;
  private readonly ancho = this.stageConfig.width;
  private readonly alto = this.stageConfig.height;

  private readonly verts: number[][] = [
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
  ];

  private readonly carasDef = [
    { idx: [0, 1, 2, 3], color: '#ef4444' },
    { idx: [5, 4, 7, 6], color: '#3b82f6' },
    { idx: [1, 5, 6, 2], color: '#22c55e' },
    { idx: [4, 0, 3, 7], color: '#eab308' },
    { idx: [3, 2, 6, 7], color: '#a855f7' },
    { idx: [4, 5, 1, 0], color: '#f97316' },
  ];

  ngAfterViewInit(): void {
    this.aplicarMatriz();
  }

  ngOnChanges(): void {
    this.aplicarMatriz();
  }

  private aplicarMatriz(): void {
    if (!this.caras || this.caras.length === 0 || !this.state) return;
    const s = this.state;

    const T = mat4.fromTranslation(mat4.create(), [s.tx, s.ty, 0]);
    const P = mat4.fromTranslation(mat4.create(), [0, 0, -450]);
    const R = mat4.create();
    mat4.rotateY(R, R, this.viewY);
    mat4.rotateX(R, R, this.viewX);
    mat4.rotateY(R, R, (s.angle * Math.PI) / 180);
    const S = mat4.fromScaling(mat4.create(), [
      this.base * s.scale * (s.flipX ? -1 : 1),
      this.base * s.scale * (s.flipY ? -1 : 1),
      this.base * s.scale,
    ]);

    const modelo = mat4.create();
    mat4.multiply(modelo, T, P);
    mat4.multiply(modelo, modelo, R);
    mat4.multiply(modelo, modelo, S);
    this.matrixChange.emit(Array.from(modelo));

    const proj = mat4.ortho(
      mat4.create(),
      -220,
      220,
      (-220 * this.alto) / this.ancho,
      (220 * this.alto) / this.ancho,
      0.1,
      2000,
    );
    const mvp = mat4.multiply(mat4.create(), proj, modelo);

    const resultados = this.carasDef.map((def) => {
      const puntos: number[] = [];
      let zs = 0;
      for (const vi of def.idx) {
        const v = vec4.fromValues(
          this.verts[vi][0],
          this.verts[vi][1],
          this.verts[vi][2],
          1,
        );
        vec4.transformMat4(v, v, mvp);
        zs += v[2];
        const w = v[3];
        puntos.push(
          ((v[0] / w + 1) / 2) * this.ancho,
          (1 - ((v[1] / w + 1) / 2)) * this.alto,
        );
      }
      return { puntos, z: zs / def.idx.length, color: def.color };
    });

    resultados.sort((a, b) => b.z - a.z);

    this.caras.toArray().forEach((cara, i) => {
      const r = resultados[i];
      cara.getNode().setAttrs({
        points: r.puntos,
        fill: r.color,
        stroke: '#1e293b',
        strokeWidth: 1,
        closed: true,
      });
    });
  }
}