import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, Form, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from '../../home.service';
import moment from 'moment';

@Component({
  selector: 'app-modal-update-crop',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatDialogModule],
  templateUrl: './modal-update-crop.component.html',
  styleUrl: './modal-update-crop.component.scss'
})
export class ModalUpdateCropComponent implements OnInit {

  crop : any = [];
  form: FormGroup;
  update_crop: any = []

  constructor(private fb: FormBuilder, public dialog: MatDialog, private serHome: HomeService, private snackBar: MatSnackBar){
    this.form = fb.group({
      hectares: [0.0 , [Validators.required]],
      seed_time: ['', [Validators.required]],
      approximate_durability_date: ['', [Validators.required]],
      approximate_weeks_crop_durability: [0 ,[Validators.required]],
      harvest_id: [0],
      user_id: [0]
    });
  }

  ngOnInit(){
    this.serHome.elemento$.subscribe(crop => {
      this.crop= crop;
      this.form.patchValue({
        hectares: crop.hectares,
        seed_time: crop.seed_time,
        approximate_durability_date: crop.approximate_durability_date,
        approximate_weeks_crop_durability: crop.approximate_weeks_crop_durability,
        harvest_id: crop.harvest_id,
        user_id: crop.user_id
      });
    });
  }

  setData(){
    return{
      hectares: this.form.value.hectares,
      seed_time: moment(this.form.value.seed_time).format('YYYY-MM-DD'),
      approximate_durability_date:  moment(this.form.value.approximate_durability_date).format('YYYY-MM-DD'),
      approximate_weeks_crop_durability: this.form.value.approximate_weeks_crop_durability,
      harvest_id: this.form.value.harvest_id,
      user_id: this.form.value.user_id
    }
  }

  submit(){
    this.serHome.updateCrop( this.crop.id_crop, this.setData()).subscribe(
      (res: any) => {
      this.update_crop = res
      this.sucessAlert();
      },
      (err) => {
        this.errorAlert();
      }
    );
  }

  sucessAlert() {
    this.snackBar.open('Cosecha Actualizada', '👍', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    });
  }

  errorAlert() {
    this.snackBar.open('Actualización Fallido', '👎', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

}
