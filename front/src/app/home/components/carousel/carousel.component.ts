import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcarruselItem } from './Icarrusel-items.metadata';
import { CAROUSEL_DATA_ITEMS } from '../../constants/carousel.const';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {

  intervalTime ?: null | ReturnType<typeof setTimeout> = null
  timeoutTime ?: null | ReturnType<typeof setTimeout> = null
  aux : number = 0;

  @Input() height = 500;
  @Input() isFullScreen = false;
  @Input() carouselItems: IcarruselItem[] = [];

  public finalHeight : string | number = 0;
  currentIndex = 0;

  constructor(){
    
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
  }

  ngOnInit(){
    this.carouselItems.map( (i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }

  setCurrentPosition(position: number){
    this.currentIndex = position;
    const item = this.carouselItems.find(i => i.id === 0);
    if (item) {
      item.marginLeft = -100 * position;
    }
  }

  setNext(){
    let finalPercentage = 0;
    let nextPosition = this.currentIndex + 1;
    if(nextPosition <= this.carouselItems.length - 1){
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    const item = this.carouselItems.find(i => i.id === 0);
    if (item) {
      item.marginLeft = finalPercentage;
    }
    this.currentIndex = nextPosition;
  }

  setBack(){
    let finalPercentage = 0;
    let backPosition = this.currentIndex - 1;
    if(backPosition >= 0){
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.carouselItems.length - 1;
      finalPercentage = -100 * backPosition;
    }
    const item = this.carouselItems.find(i => i.id === 0);
    if (item) {
      item.marginLeft = finalPercentage;
    }
    this.currentIndex = backPosition;
  }

  btnsInterval(){
    clearInterval(this.intervalTime!);
    clearTimeout(this.timeoutTime!);
    this.controllerInterval();
  }

  interval(){
    clearInterval(this.intervalTime!);
    this.intervalTime = setInterval( () => {
      this.setNext();
    },5000);
  }

  controllerInterval(){
    clearTimeout(this.timeoutTime!);
    this.timeoutTime = setTimeout( () => {
      this.interval();
    },5000);
  }

}
