import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
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

  esRutaStatistics(): boolean {
    return this.route.snapshot.routeConfig?.path === 'statistics';
  }

  esRutaHome(){
    return this.route.snapshot.routeConfig?.path === 'home';
  }
  esRutaServices(){
    return this.route.snapshot.routeConfig?.path === 'services';
  }

  esRutaAbout(){
    return this.route.snapshot.routeConfig?.path === 'about';
  }


  navigateTo(route: string): void {
    this.router.navigate(["/"+route]);
  }
}
