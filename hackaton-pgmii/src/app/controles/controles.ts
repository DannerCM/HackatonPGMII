import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-controles',
  templateUrl: './controles.html',
  styleUrl: './controles.css',
})
export class Controles implements AfterViewInit {
  @Output() stateChange = new EventEmitter<{ tx: number; ty: number; scale: number }>();

  tx = 0;
  ty = 0;
  scale = 1;

  ngAfterViewInit(): void {
    this.emitir();
  }

  emitir(): void {
    this.stateChange.emit({ tx: this.tx, ty: this.ty, scale: this.scale });
  }
}