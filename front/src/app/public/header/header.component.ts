import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule,  FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  closet_senssion = faRightFromBracket;
  name_user: string = "";
  email_user: string = "";
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

  login(): boolean{
    if(typeof localStorage !== 'undefined'){
      if(localStorage.getItem('session')){
        const session_str = localStorage.getItem('session');
        if(session_str){
          const session = JSON.parse(session_str);
          this.name_user = session.name_user;
          this.email_user = session.email_user;
        }
        return true;
      }
    }
    return false;
  }

  closetSession(){
    if(typeof localStorage !== 'undefined'){
      localStorage.clear()
      this.router.navigate(['/login']);
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

  esRutaFarmers(){
    return this.route.snapshot.routeConfig?.path === 'farmers';
  }

  navigateTo(route: string): void {
    this.router.navigate(["/"+route]);
  }
}
