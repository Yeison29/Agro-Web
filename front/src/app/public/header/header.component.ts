import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    public dialog: MatDialog
  ) {}

  dropDown : string = " ";
  menu : string = " ";
  drop(){
    if(this.dropDown!="onDropdown"){
      this.dropDown = "onDropdown";
      this.menu="onMenu";
    }else {
      this.dropDown = "offDropdown";
      setTimeout(()=>{
        this.menu=" ";
        this.dropDown=" ";
      }, 400);
    }
  }
}
