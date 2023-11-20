import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../public/header/header.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  
  ngOnInit() {
    
  }
  
}
