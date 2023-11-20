import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../public/header/header.component';
import { CreatecropsComponent } from '../../components/createcrops/createcrops.component';
import { TableCropsComponent } from '../../components/table-crops/table-crops.component';
import { FooterComponent } from '../../../public/footer/footer.component';

@Component({
  selector: 'app-crops',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CreatecropsComponent, TableCropsComponent, FooterComponent],
  templateUrl: './crops.component.html',
  styleUrl: './crops.component.scss'
})
export class CropsComponent {

}
