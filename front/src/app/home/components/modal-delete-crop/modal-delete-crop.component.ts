import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, Form, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ModalConfirmDeleteComponent } from '../modal-confirm-delete/modal-confirm-delete.component';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-modal-delete-crop',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatDialogModule],
  templateUrl: './modal-delete-crop.component.html',
  styleUrl: './modal-delete-crop.component.scss'
})
export class ModalDeleteCropComponent implements OnInit {

  crop : any = [];

  form: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog, public dialogoRef: MatDialogRef<ModalDeleteCropComponent>, private serHome: HomeService){
    this.form = fb.group({
      hectares: [{value: null, readonly: true},[Validators.required]],
      seed_time: ['', [Validators.required]],
      approximate_durability_date: ['', [Validators.required]],
      approximate_weeks_crop_durability: [null,[Validators.required]],
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

  submit(){
    this.serHome.getOneCrops(this.crop.id_crop).subscribe((res: any) => {
      this.serHome.setCrop(res);
      const dialogRef = this.dialog.open(ModalConfirmDeleteComponent);
        dialogRef.afterClosed().subscribe(result => {
            if(result){
    
            }
            this.dialogoRef.close(true);
        });
    });
  }

  eliminarCosecha() {
    // Lógica para eliminar la cosecha
    console.log("eliminé");
  }

}
