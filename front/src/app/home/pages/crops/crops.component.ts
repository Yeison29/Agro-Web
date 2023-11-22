import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, Form, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { HomeService } from '../../home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { HeaderComponent } from '../../../public/header/header.component';
import { TableCropsComponent } from '../../components/table-crops/table-crops.component';
import { FooterComponent } from '../../../public/footer/footer.component';

@Component({
  selector: 'app-crops',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TableCropsComponent, FooterComponent, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatDialogModule],
  templateUrl: './crops.component.html',
  styleUrl: './crops.component.scss'
})
export class CropsComponent implements OnInit {

  @ViewChild(TableCropsComponent) table: any = TableCropsComponent;

  harvest : any = [];

  session_user_id: any;

  form: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private serHome: HomeService, private snackBar: MatSnackBar){
    this.form = fb.group({
      hectares: [0.0,[Validators.required]],
      seed_time: ['', [Validators.required]],
      approximate_durability_date: ['', [Validators.required]],
      approximate_weeks_crop_durability: [0 ,[Validators.required]],
      harvest_id: [0, [Validators.required]],
      user_id: [0]
    });
  }

  ngOnInit(): void {
    this.getHarvest();
    if(typeof localStorage !== 'undefined'){
      const local_storange = localStorage.getItem('session')
      if(local_storange !== null){
        const local_store = JSON.parse(local_storange)
        this.session_user_id= local_store.id_user;
      }
    }
  }

  getHarvest(){
    this.serHome.getHarvest().subscribe(
      (res: any) => {
      this.harvest = res
      }
    );
  }

  setData(){
    return {
      hectares: this.form.value.hectares,
      seed_time:  moment(this.form.value.seed_time).format('YYYY-MM-DD'),
      approximate_durability_date: moment(this.form.value.approximate_durability_date).format('YYYY-MM-DD'),
      approximate_weeks_crop_durability: this.form.value.approximate_weeks_crop_durability,
      harvest_id: this.form.value.harvest_id,
      user_id: this.session_user_id
    }
  }

  async submit(){
    await this.serHome.addCrops(this.setData()).subscribe(
      (res: any) => {
        this.sucessAlert();
        this.form.reset();
        if (this.table) {
          this.table.getAlldata();
        }
      },
      (err: any) => {
        this.errorAlert()
      },
    );
  }

  sucessAlert() {
    this.snackBar.open('Cosecha Creada', '👍', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    });
  }

  errorAlert() {
    this.snackBar.open('Error al registrar Cosecha', '👎', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

}
