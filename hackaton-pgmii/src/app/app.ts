import { Component } from '@angular/core';
import { Controles } from './controles/controles';
import { Figura } from './figura/figura';

@Component({
  selector: 'app-root',
  imports: [Figura, Controles],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}