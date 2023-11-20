import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../public/header/header.component';
import { CreatecropsComponent } from '../../components/createcrops/createcrops.component';

@Component({
  selector: 'app-crops',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CreatecropsComponent],
  templateUrl: './crops.component.html',
  styleUrl: './crops.component.scss'
})
export class CropsComponent {

}
