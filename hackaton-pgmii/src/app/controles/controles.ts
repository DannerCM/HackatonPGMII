import { Component } from '@angular/core';

@Component({
  selector: 'app-controles',
  imports: [],
  templateUrl: './controles.html',
  styleUrl: './controles.css'
})
export class Controles {
  flipX = false;
  flipY = false;

  toggleFlipX(): void {
    this.flipX = !this.flipX;
  }

  toggleFlipY(): void {
    this.flipY = !this.flipY;
  }
}