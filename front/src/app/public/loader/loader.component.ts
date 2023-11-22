import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  constructor(private active: LoaderService) { }

  la$ = this.active.active$;

  activar(){
    this.active.setActive();
  }

  inactivar(){
    this.active.setInactive();
  }

}
