import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
