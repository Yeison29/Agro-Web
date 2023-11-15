import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';

import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  matcher = new MyErrorStateMatcher();
  right_panel : string = "";
  icon_git_hub = faCodeBranch;
  icon_facebook = faThumbsUp;
  icon_instagram = faHeart;

  constructor(
    private fb: FormBuilder,
    // private categoriesService: CategoriesService,
    // private ser: ProductServiceService,
    // private router: Router,
    // private snackBar: MatSnackBar
  ) {}

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  form = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    id_document: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    type_document: [0, [Validators.required]],
    gender: [0, [Validators.required]],
    municipality: [0, [Validators.required]]
  });

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