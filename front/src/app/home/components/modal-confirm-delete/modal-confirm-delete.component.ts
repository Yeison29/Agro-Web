
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-confirm-delete',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './modal-confirm-delete.component.html',
  styleUrl: './modal-confirm-delete.component.scss'
})
export class ModalConfirmDeleteComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ModalConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {

    this.mensaje = "¿Está seguro de eliminar la cosecha?";
  }
}
