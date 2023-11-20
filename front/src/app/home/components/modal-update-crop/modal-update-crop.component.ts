import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, Form, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-update-crop',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatDialogModule],
  templateUrl: './modal-update-crop.component.html',
  styleUrl: './modal-update-crop.component.scss'
})
export class ModalUpdateCropComponent {
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
      hectares: [null,[Validators.required]],
      seed_time: ['', [Validators.required]],
      approximate_durability_date: ['', [Validators.required]],
      approximate_weeks_crop_durability: [null,[Validators.required]],
      harvest_id: [null, [Validators.required]]
    });
  }

  submit(){
    if(!this.form.invalid){
      console.log("Exito");
    }else {
      console.log("Error");
    }
  }
}
