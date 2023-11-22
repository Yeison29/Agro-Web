import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
import {HeaderComponent} from "./public/header/header.component";
import {FooterComponent} from "./public/footer/footer.component";
import {MatIconModule} from "@angular/material/icon";
import { LoaderComponent } from './public/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, HeaderComponent, MatIconModule, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
}
