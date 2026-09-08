import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { TransformState } from '../transform.model';

@Component({
  selector: 'app-controles',
  templateUrl: './controles.html',
  styleUrl: './controles.css',
})
export class Controles implements AfterViewInit {
  @Input() state: TransformState | null = null;
  @Input() matrix: number[] | null = null;
  @Output() stateChange = new EventEmitter<{ tx: number; ty: number; scale: number }>();
  @Output() flipXChange = new EventEmitter<boolean>();
  @Output() flipYChange = new EventEmitter<boolean>();

  tx = 0;
  ty = 0;
  scale = 1;

  ngAfterViewInit(): void {
    this.emitir();
  }

  emitir(): void {
    this.stateChange.emit({ tx: this.tx, ty: this.ty, scale: this.scale });
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