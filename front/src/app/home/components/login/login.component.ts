import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';

import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { HomeService } from '../../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  hide = true;
  right_panel: string = '';
  icon_back = faLeftLong;
  type_documents: any = [];
  genders: any = [];
  departments: any = [];
  municipalities: any = [];
  form: FormGroup;
  form_password: FormGroup;
  form_login: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serHome: HomeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    
    this.form = fb.group({
      name_user: ['', [Validators.required]],
      lastname_user: ['', [Validators.required]],
      email_user: ['', [Validators.required, Validators.email]],
      phone_user: ['', [Validators.required]],
      id_document_user: ['', [Validators.required]],
      birthdate_user: ['', [Validators.required]],
      type_document_id: [null, [Validators.required]],
      gender_id: [null, [Validators.required]],
      municipality_id: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
    this.form_password = fb.group({
      auth_password: ['', [Validators.required]],
      auth_password2: ['', [Validators.required]],
    });
    this.form_login = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllTypeDocuments();
    this.getAllGenders();
    this.getAllDepartments(1);
  }

  navigateTo(route: string): void {
    this.router.navigate(["/"+route]);
  }

  getAllTypeDocuments() {
    this.serHome.getAllTypeDocuments().subscribe((res: any) => {
      this.type_documents = res;
      console.log(res);
    });
  }

  getAllDepartments(id: any) {
    this.serHome.getAllDepartments(id).subscribe((res: any) => {
      this.departments = res;
      console.log(res);
    });
  }

  getAllMunicipalities(id: any) {
    this.serHome.getAllMunicipalities(id).subscribe((res: any) => {
      this.municipalities = res;
      console.log(res);
    });
  }

  getAllGenders() {
    this.serHome.getAllGenders().subscribe((res: any) => {
      this.genders = res;
      console.log(res);
    });
  }

  onDepartamento(id: any) {
    console.log(id);
    this.getAllMunicipalities(id);
  }

  activeActivePanel() {
    this.form_login.reset();
    this.right_panel = 'right-panel-active';
  }

  removeActivePanel() {
    this.form_password.reset();
    this.form.reset();
    this.right_panel = '';
  }

  mapData() {
    return {
      user: {
        name_user: this.form.value.name_user,
        lastname_user: this.form.value.lastname_user,
        email_user: this.form.value.email_user,
        phone_user: this.form.value.phone_user,
        id_document_user: this.form.value.id_document_user,
        birthdate_user: moment(this.form.value.birthdate_user).format('YYYY-MM-DD'),
        type_document_id: this.form.value.type_document_id,
        gender_id: this.form.value.gender_id,
        municipality_id: this.form.value.municipality_id,
      },
      auth: {
        auth_password: this.form_password.value.auth_password,
      },
    };
  }

  submitSingUp() {
    if (
      this.form_password.value.auth_password2 ===
      this.form_password.value.auth_password
    ) {
      if (this.form.valid && this.form_password.valid) {
        this.serHome.addUser(this.mapData()).subscribe(
          (res: any) => {
            this.sucessAlert('Registro exitoso, verifique su correo para activar la cuenta');
            this.removeActivePanel();
          },
          (err) => {
            this.errorAlert('Registro Fallido');
          }
        );
        this.form_password.reset();
        this.form.reset();
      }
    }else {
      this.errorAlert('Contraseñas no coinciden');
    }
  }

  submit(){
    if(this.form_login.valid){
      this.serHome.getToken(this.form_login.value).subscribe(
        (res: any) => {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('session', JSON.stringify(this.session(res)))
          this.sucessAlert('Inicio Sesión exitoso');
          this.form_login.reset();
          this.router.navigate(['/home']);
        },
        (err) => {
          this.errorAlert(err.error.detail);
        }
      );
    }
  }

  session(data: any){
    return {
      name_user: data.name_user,
      email_user: data.email_user,
      id_user: data.user_id
    }
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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
