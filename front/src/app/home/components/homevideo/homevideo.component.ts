import { Component, Inject, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InewItem } from '../news/Inews-items.metadata';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-homevideo',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './homevideo.component.html',
  styleUrl: './homevideo.component.scss'
})
export class HomevideoComponent implements OnInit, AfterViewInit {
  
  @ViewChild('youTubePlayer') youTubePlayer?: ElementRef<HTMLDivElement>;
  videoHeight: number | undefined;
  videoWidth: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<HomevideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InewItem,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    // you can remove this line if you want to have wider video player than 1200px
    if(this.youTubePlayer){
      this.videoWidth = Math.min(
        this.youTubePlayer.nativeElement.clientWidth,
        1200
      );
      // so you keep the ratio
      this.videoHeight = this.videoWidth * 0.6;
      this.changeDetectorRef.detectChanges();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
