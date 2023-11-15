import { Component, OnInit, Input, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { InewItem } from './Inews-items.metadata';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, DOCUMENT  } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HomevideoComponent } from '../homevideo/homevideo.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, YouTubePlayerModule, MatIconModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent{

  @Input() items : InewItem[] = [];

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const tag = this.renderer.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      this.renderer.appendChild(document.body, tag);
    }
  }

  openVideo(videoSelect?: InewItem): void {
    const dialogRef = this.dialog.open(HomevideoComponent, {
      data: videoSelect,
      width: "500px",
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        console.log("entro");
      }
    });
  }
}
