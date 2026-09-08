import {
  Component,
  ElementRef,
  NgZone,
  effect,
  viewChild
} from '@angular/core';
import Konva from 'konva';
import { TransformService } from '../transform.service';

@Component({
  selector: 'app-figura',
  imports: [],
  templateUrl: './figura.html',
  styleUrl: './figura.css'
})
export class Figura {
  private readonly stageContainer = viewChild.required<ElementRef<HTMLDivElement>>('stage');

  private stage!: Konva.Stage;
  private figure!: Konva.Shape;

  constructor(
    private readonly transform: TransformService,
    private readonly ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    const container = this.stageContainer().nativeElement;

    this.stage = new Konva.Stage({
      container,
      width: 600,
      height: 400
    });

    const layer = new Konva.Layer();
    this.stage.add(layer);

    this.addGuideLines(layer);

    this.figure = new Konva.Shape({
      x: 300,
      y: 200,
      scaleX: 1,
      scaleY: 1,
      sceneFunc: (context, shape) => {
        context.beginPath();
        context.moveTo(0, -70);
        context.lineTo(120, 0);
        context.lineTo(0, 70);
        context.closePath();
        context.fillStrokeShape(shape);
      },
      fill: '#7c3aed',
      stroke: '#4c1d95',
      strokeWidth: 3
    });
    layer.add(this.figure);
    layer.draw();

    this.ngZone.runOutsideAngular(() => {
      effect(() => {
        const m = this.transform.matrix();
        const state = this.transform.state();
        this.figure.setAttrs({
          x: m[4],
          y: m[5],
          rotation: state.angle,
          scaleX: m[0],
          scaleY: m[3]
        });
        this.figure.getLayer()?.batchDraw();
      });
    });
  }

  private addGuideLines(layer: Konva.Layer): void {
    const axisX = new Konva.Line({
      points: [0, 200, 600, 200],
      stroke: '#94a3b8',
      strokeWidth: 1,
      dash: [6, 6]
    });
    const axisY = new Konva.Line({
      points: [300, 0, 300, 400],
      stroke: '#94a3b8',
      strokeWidth: 1,
      dash: [6, 6]
    });
    layer.add(axisX, axisY);
  }
}