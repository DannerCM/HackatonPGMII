import { Component } from '@angular/core';
import { TransformService } from '../transform.service';

@Component({
  selector: 'app-controles',
  imports: [],
  templateUrl: './controles.html',
  styleUrl: './controles.css'
})
export class Controles {
  constructor(readonly transform: TransformService) {}

  toggleFlipX(): void {
    this.transform.toggleFlipX();
  }

  toggleFlipY(): void {
    this.transform.toggleFlipY();
  }
}