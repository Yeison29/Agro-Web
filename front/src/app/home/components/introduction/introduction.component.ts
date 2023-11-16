import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InewItem } from '../news/Inews-items.metadata';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent{

  @Input() items: InewItem[] = [];

  constructor(){}

}

