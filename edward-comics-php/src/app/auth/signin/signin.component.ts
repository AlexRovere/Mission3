import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.iniForm();
  }

  //méthode de vérification regex du formulaire. formbuilder permet de verifier lors de la saisie
  iniForm() {
    this.signinForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(255)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9a-zA-Z]/),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  //vérification email et mot de passe en appeant la méthode signinUser de authService
  onSubmit() {
    const email = this.signinForm.get('email')?.value;
    const password = this.signinForm.get('password')?.value;
    let loginInfo = { email: email, password: password };
    this.authService.signInUser(loginInfo);
  }
}
