import { Component } from '@angular/core';
import { MainCarousel } from './main-carousel/main-carousel';

@Component({
  selector: 'app-home',
  imports: [MainCarousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
