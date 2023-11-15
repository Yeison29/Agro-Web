import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcarruselItem } from './Icarrusel-items.metadata';
import { CAROUSEL_DATA_ITEMS } from '../../constants/carousel.const';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {
  carouselItems: IcarruselItem[] = [];
  public finalHeight : string | number = 0;
  @Input() height = 500;
  @Input() isFullScreen = false;

  constructor(){
    
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
  }

  ngOnInit(): void {
    // Asigna la constante de datos a la propiedad del componente
    this.carouselItems = CAROUSEL_DATA_ITEMS;
  }
}
