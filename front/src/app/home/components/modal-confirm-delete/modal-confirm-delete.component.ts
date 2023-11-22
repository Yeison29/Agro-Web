import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HomeService } from '../../home.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-confirm-delete',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './modal-confirm-delete.component.html',
  styleUrl: './modal-confirm-delete.component.scss',
})
export class ModalConfirmDeleteComponent implements OnInit {
  crop: any = [];

  constructor(
    public dialogo: MatDialogRef<ModalConfirmDeleteComponent>,
    private serHome: HomeService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public mensaje: string
  ) {}

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.serHome.deleteCrop(this.crop.id_crop).subscribe(
      (res: any) => {
        this.sucessAlert();
      },
      (err: any) => {
        this.errorAlert();
      });
    this.dialogo.close(true);
  }

  ngOnInit() {
    this.serHome.elemento$.subscribe((crop) => {
      this.crop = crop;
    });
  }

  sucessAlert() {
    this.snackBar.open('Cosecha Eliminada', '👍', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    });
  }

  errorAlert() {
    this.snackBar.open('Eliminación Fallida', '👎', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
