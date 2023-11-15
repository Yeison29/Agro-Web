import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InewItem } from '../news/Inews-items.metadata';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule, YouTubePlayerModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent{

  @Input() items: InewItem[] = [];

  constructor(){}

}

