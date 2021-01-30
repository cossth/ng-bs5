import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Carousel } from 'bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  carousels: CarouselResponse[] = [];
  carousel: Carousel | null = null;
  isDark = false;
  activeSlide = 0;

  @ViewChild('exampleCarousel', { static: true })
  carouselElement?: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<CarouselResponse[]>('/assets/carousel.json')
      .subscribe((carousels) => {
        this.carousels = carousels;
        this.carousel = new Carousel(this.carouselElement?.nativeElement);
      });

    this.carouselElement?.nativeElement.addEventListener(
      'slide.bs.carousel',
      this.onSlide
    );
  }

  // Don't use functions otherwise you can't use values of angular component
  onSlide = (
    e: Event & {
      direction: 'left' | 'right';
      relatedTarget: HTMLElement;
      from: number;
      to: number;
    }
  ) => {
    console.log(`Direction: ${e.direction}`);
    this.isDark = this.carousels[e.to].isDark || false;
    this.activeSlide = e.to;
  };
}

interface CarouselResponse {
  url: string;
  text: string;
  heading: string;
  link: string;
  isDark?: boolean;
}
