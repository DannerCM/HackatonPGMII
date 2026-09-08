import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlesComponent } from './controles/controles';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ControlesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'hackaton-pgmii';
}