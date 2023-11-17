import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, Form, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit  {

  matcher = new MyErrorStateMatcher();
  hide = true;
  right_panel : string = "";
  icon_git_hub = faCodeBranch;
  icon_facebook = faThumbsUp;
  icon_instagram = faHeart;
  type_documents : any = [];
  genders : any = [];
  departments : any = [];
  municipalities : any = [];
  form: FormGroup;
  form_password: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serHome: HomeService,
    private snackBar: MatSnackBar,
    // private ser: ProductServiceService,
    // private router: Router,
    // private snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      name_user: ['', [Validators.required]],
      lastname_user: ['', [Validators.required]],
      email_user: ['', [Validators.required, Validators.email]],
      phone_user: ['', [Validators.required]],
      id_document_user: ['', [Validators.required]],
      birthdate_user: ['', [Validators.required]],
      type_document_id: [null,[Validators.required]],
      gender_id: [null, [Validators.required]],
      municipality_id: [null, [Validators.required]],
      department: [null,[Validators.required]]
    });
    this.form_password = fb.group({
      auth_password: ['',[Validators.required]],
      auth_password2: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllTypeDocuments();
    this.getAllGenders();
    this.getAllDepartments(1);
  }

  getAllTypeDocuments(){
    this.serHome.getAllTypeDocuments().subscribe((res: any) => {
      this.type_documents = res;
      console.log(res);
    });
  }

  // getAllCountries(){
  //   this.serHome.getAllCountries().subscribe((res: any) => {
  //     this.genders = res;
  //     console.log(res);
  //   });
  // }

  getAllDepartments(id: any){
    this.serHome.getAllDepartments(id).subscribe((res: any) => {
      this.departments = res;
      console.log(res);
    });
  }

  getAllMunicipalities(id: any){
    this.serHome.getAllMunicipalities(id).subscribe((res: any) => {
      this.municipalities = res;
      console.log(res);
    });
  }

  getAllGenders(){
    this.serHome.getAllGenders().subscribe((res: any) => {
      this.genders = res;
      console.log(res);
    });
  }

  onDepartamento(id: any) {
    console.log(id)
    this.getAllMunicipalities(id);
  }


  activeActivePanel(){
    this.right_panel = "right-panel-active";
  }

  removeActivePanel(){
    this.right_panel = "";
  }

  submit(){
    if(this.form_password.value.auth_password2 === this.form_password.value.auth_password){
      if(!this.form.invalid && !this.form_password.invalid){
        this.form.removeControl('department');
        this.serHome.addUser(this.form.value).subscribe(
          (res: any) => {
            this.sucessAlert();
            console.log(res);
          },
          (err) => {
            this.errorAlert('Registro Fallido');
          }
        );
        this.form.reset();
        this.form_password.reset();
      }
    }
    this.errorAlert('Contraseñas no coinciden');
  }

  sucessAlert() {
    this.snackBar.open('Registro exitoso', '👍', {
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
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  } 
}