import { Component, ElementRef, viewChild } from '@angular/core';
import Konva from 'konva';

@Component({
  selector: 'app-figura',
  imports: [],
  templateUrl: './figura.html',
  styleUrl: './figura.css'
})
export class Figura {
  private readonly stageContainer = viewChild.required<ElementRef<HTMLDivElement>>('stage');

  ngAfterViewInit(): void {
    const stage = new Konva.Stage({
      container: this.stageContainer().nativeElement,
      width: 600,
      height: 400
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    addGuideLines(layer);

    const figure = new Konva.Shape({
      x: 300,
      y: 200,
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
    layer.add(figure);
    layer.draw();
  }
}

function addGuideLines(layer: Konva.Layer): void {
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