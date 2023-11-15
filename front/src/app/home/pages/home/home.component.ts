import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { HeaderComponent } from '../../../public/header/header.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { NewsComponent } from '../../components/news/news.component';
import { IcarruselItem } from '../../components/carousel/Icarrusel-items.metadata';
import { CAROUSEL_DATA_ITEMS } from '../../constants/carousel.const';
import { InewItem } from '../../components/news/Inews-items.metadata';
import { NEW_DATA_ITEMS } from '../../constants/news.const';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoginComponent, CarouselComponent, HeaderComponent, IntroductionComponent, NewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public carouselData : IcarruselItem[] = CAROUSEL_DATA_ITEMS;

  public newData : InewItem[] = NEW_DATA_ITEMS;

  public data : InewItem[] = NEW_DATA_ITEMS;

}
