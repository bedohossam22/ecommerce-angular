import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { homeCarouselData } from './carousel-data';

@Component({
  selector: 'app-main-carousel',
  imports: [RouterLink, NgFor],
  templateUrl: './main-carousel.html',
  styleUrl: './main-carousel.css',
})
export class MainCarousel implements OnInit {
  carouselData = homeCarouselData;
  currentSlide = 0;

  ngOnInit() {
    this.autoPlay();
  }

  autoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselData.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.carouselData.length) % this.carouselData.length;
  }
}
