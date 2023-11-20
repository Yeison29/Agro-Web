import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, Form, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ModalConfirmDeleteComponent } from '../modal-confirm-delete/modal-confirm-delete.component';

@Component({
  selector: 'app-modal-delete-crop',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatDialogModule],
  templateUrl: './modal-delete-crop.component.html',
  styleUrl: './modal-delete-crop.component.scss'
})
export class ModalDeleteCropComponent implements OnInit {

  harvest : any = [
    {
      id_harvest: 1,
      name: 'PAPA',
      code: '1'
    },
    {
      id_harvest: 2,
      name: 'Platano',
      code: '2'
    }
];

  form: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog){
    this.form = fb.group({
      hectares: [{value: null, readonly: true},[Validators.required]],
      seed_time: ['', [Validators.required]],
      approximate_durability_date: ['', [Validators.required]],
      approximate_weeks_crop_durability: [null,[Validators.required]],
      harvest_id: [{value: null, disabled: true}, [Validators.required]]
    });
  }

  ngOnInit(){
    this.get_harvest();
  }

  submit(){
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe((result : Boolean) => {

    if (result) {
      this.eliminarCosecha();
    }else{
      console.log("cancelado");
    }
  });
  }

  eliminarCosecha() {
    // Lógica para eliminar la cosecha
    console.log("eliminé");
  }

  get_harvest(){
    //Hacer la consulta para traer el cultivo relacionado a esa cosecha.

    //Crear logica para obtener los datos de la cosecha

    

    this.form.patchValue({
      hectares: 0.4,
      seed_time: new Date('07/05/2022'),
      approximate_durability_date: new Date('07/05/2022'),
      approximate_weeks_crop_durability: 4,
      harvest_id: 2
    });
  }
}
