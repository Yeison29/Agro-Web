import { Component, OnInit, Input, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { InewItem } from './Inews-items.metadata';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, DOCUMENT  } from '@angular/common';
import { HomevideoComponent } from '../homevideo/homevideo.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent{

  @Input() items : InewItem[] = [];

}
