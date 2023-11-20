import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {HeaderComponent} from "../../../public/header/header.component";
import {FooterComponent} from "../../../public/footer/footer.component";

@Component({
  selector: 'app-ours',
  standalone: true,
  imports: [CommonModule, MatIconModule, HeaderComponent, FooterComponent],
  templateUrl: './farmers.component.html',
  styleUrl: './farmers.component.scss'
})

export class FarmersComponent {

}
