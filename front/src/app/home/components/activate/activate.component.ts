import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute , Router} from '@angular/router';
import { HomeService } from '../../home.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent implements OnInit {

  constructor(private route : ActivatedRoute, private serHome: HomeService, private router: Router, private snackBar: MatSnackBar){}

  ngOnInit() {
    this.activate()
  }

  activate(){
    this.serHome.activateAccount(this.route.snapshot.params['code']).subscribe(
      (res: any) => {
        this.sucessAlert('Cuenta Activada');
      },
      (err) => {
        this.errorAlert(err.error.detail);
      }
    );
    this.router.navigate(['/login']);
  }

  sucessAlert(msg: any) {
    this.snackBar.open(msg, '👍', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    });
  }

  errorAlert(msg: any) {
    this.snackBar.open(msg, '👎', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
