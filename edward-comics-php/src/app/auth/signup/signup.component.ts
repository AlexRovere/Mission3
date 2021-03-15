import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage!: String;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  //méthode de vérification des pattern lors de la saisie
  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      passwordConfirm: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      telephone: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      nom: ['', [Validators.required, Validators.pattern(/[a-zA-Z]/)]],
      prenom: ['', [Validators.required, Validators.pattern(/[a-zA-Z]/)]],
      adresse: ['', [Validators.pattern(/[0-9a-zA-Z]/)]],
      codePostal: ['', [Validators.pattern(/[0-9]/)]],
      ville: ['', [Validators.pattern(/[a-zA-Z]/)]]
    });
  }

  //recupération des infos saisie pour créer un nouveau client
  onSubmit() {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const passwordConfirm = this.signupForm.get('passwordConfirm')?.value;
    const nom = this.signupForm.get('nom')?.value;
    const prenom = this.signupForm.get('prenom')?.value;
    const telephone = this.signupForm.get('telephone')?.value;
    const adresse = this.signupForm.get('adresse')?.value;
    const codePostal = this.signupForm.get('codePostal')?.value;
    const ville = this.signupForm.get('ville')?.value;

    let user: IUser = {
      nom: nom,
      prenom: prenom,
      email: email,
      telephone: telephone,
      password: password,
      passwordConfirm: passwordConfirm,
      adresse: adresse,
      codePostal: codePostal,
      ville: ville
    }

    // let formData: any = new FormData();
    // formData.append("nom", this.signupForm.get('nom')?.value);
    // formData.append("prenom", this.signupForm.get('prenom')?.value);
    // formData.append("email", this.signupForm.get('email')?.value);
    // formData.append("telephone", this.signupForm.get('telephone')?.value);
    // formData.append("password", this.signupForm.get('password')?.value);
    // formData.append("adresse", this.signupForm.get('adresse')?.value);
    // formData.append("code_postal", this.signupForm.get('codePostal')?.value);
    // formData.append("ville", this.signupForm.get('ville')?.value);

    this.authService.createNewUser(user);

    // this.authService.createNewUser(email, password).then(
    //   () => {
    //     this.infoUser(email, nom, prenom, telephone, adresse, codePostal, ville);
    //     this.router.navigate(['/home']);
    //   },
    //   (error) => {
    //     this.errorMessage = error;
    //   }
    // );
  }

  //création de l'objet infoUser
  // infoUser(email: string, nom: string, prenom: string, telephone: string, adresse: string, codePostal: number, ville: string, password: string){

  //   console.log(user);
  //   let db = firebase.firestore();
  //   let usersRef = db.collection('Users').doc();

  //   usersRef.set({
  //     email: user.email,
  //     nom: user.nom,
  //     prenom: user.prenom,
  //     telephone: user.telephone,
  //     adresse: user.adresse,
  //     codePostal: user.codePostal,
  //     ville: user.ville
  //   },
  //   { merge: true });

  // }
}