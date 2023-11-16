import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { HomeService } from '../../home.service';
import { group } from 'console';

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
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  right_panel : string = "";
  icon_git_hub = faCodeBranch;
  icon_facebook = faThumbsUp;
  icon_instagram = faHeart;
  type_documents : any = [];
  genders : any = [];
  departments : any = [];
  municipalities : any = [];
  form = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    id_document: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    type_document: [null,[Validators.required]],
    gender: [null, [Validators.required]],
    municipality: [null, [Validators.required]],
    department: [null,[Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private serHome: HomeService,
    // private ser: ProductServiceService,
    // private router: Router,
    // private snackBar: MatSnackBar
  ) {}

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
    console.log("evento")
    this.getAllMunicipalities(id);
  }


  activeActivePanel(){
    this.right_panel = "right-panel-active";
  }

  removeActivePanel(){
    this.right_panel = "";
  }

  submit(){

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}