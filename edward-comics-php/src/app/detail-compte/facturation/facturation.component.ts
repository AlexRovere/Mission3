import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturation',
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.css']
})
export class FacturationComponent implements OnInit {

  updateFormFactu!: FormGroup;
  errorMessage!: String;
  updateProfil: any = {};

  infoFacturationUser: any = []


  //permet d'afficher les infos d'un user connecte
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    
   }

   ngOnInit(): void {
    this.getUserInfo(sessionStorage.getItem('id'));
    this.initForm();
  }

  getUserInfo(id: any) {
    let user = JSON.stringify(id);
    this.http.post('http://test-mission3/info_user.php', user).subscribe(
      (response: any) => {
        if (response['success']) {
          this.infoFacturationUser = response['user'];
        }
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
  }

//méthode de vérification des pattern lors de la saisie
  initForm() {
    this.updateFormFactu = this.formBuilder.group({
      nom: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      prenom: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      adresse: ['', [Validators.pattern(/^[0-9a-zA-Z ]+$/), Validators.maxLength(255)]],
      codePostal: ['', [Validators.pattern(/^[0-9]+$/), Validators.maxLength(5)]],
      ville: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      proprietaire: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      nbCarte: ['', [Validators.pattern(/^[0-9]+$/), Validators.maxLength(16)]],
      expiration: ['', [Validators.pattern(/(0[1-9]|1[012]).[0-9]{4}/), Validators.maxLength(10)]],
      cryptogramme: ['', [Validators.pattern(/^[0-9]+$/), Validators.maxLength(3)]]
    });
  }

  civiliteMr(){
    this.infoFacturationUser.civilite = "mr";
  }

  civiliteMme(){
    this.infoFacturationUser.civilite = "mme";
  }

//modifier les informations du user dans firebase après saisie
  updateUser() {

    let nom = this.updateFormFactu.get('nom')?.value;
    let prenom = this.updateFormFactu.get('prenom')?.value;
    let adresse = this.updateFormFactu.get('adresse')?.value;
    let codePostal = this.updateFormFactu.get('codePostal')?.value;
    let ville = this.updateFormFactu.get('ville')?.value;
    let proprietaireCarte = this.updateFormFactu.get('proprietaire')?.value;
    let numeroCarte = this.updateFormFactu.get('nbCarte')?.value;
    let dateCarte = this.updateFormFactu.get('expiration')?.value;
    let cryptogramme = this.updateFormFactu.get('cryptogramme')?.value;
    let civilite = this.infoFacturationUser.civilite;
    
    

    if(nom != ""){
      nom = this.updateFormFactu.get('nom')?.value;
    } else {
      nom = this.infoFacturationUser.nom;
    }
    if(prenom != ""){
      prenom = this.updateFormFactu.get('prenom')?.value;
    }else {
      prenom = this.infoFacturationUser.prenom;
    }
    if(adresse != ""){
      adresse = this.updateFormFactu.get('adresse')?.value;
    }else {
      adresse = this.infoFacturationUser.adresse;
    }
    if(codePostal != ""){
      codePostal = this.updateFormFactu.get('codePostal')?.value;
    }else {
      codePostal = this.infoFacturationUser.code_postal;
    }
    if(ville != ""){
      ville = this.updateFormFactu.get('ville')?.value;
    }else {
      ville = this.infoFacturationUser.ville;
    }
    if(proprietaireCarte != ""){
      proprietaireCarte = this.updateFormFactu.get('proprietaire')?.value;
    }else {
      proprietaireCarte = this.infoFacturationUser.cb_proprietaire;
    }
    if(numeroCarte != ""){
      numeroCarte = this.updateFormFactu.get('nbCarte')?.value;
    }else {
      numeroCarte = this.infoFacturationUser.cb_numero;
    }
    if(dateCarte != ""){
      dateCarte = this.updateFormFactu.get('expiration')?.value;
    }else {
      dateCarte = this.infoFacturationUser.cb_date;
    }
    if(cryptogramme != ""){
      cryptogramme = this.updateFormFactu.get('cryptogramme')?.value;
    }else {
      cryptogramme = this.infoFacturationUser.cb_cryptogramme;
    }

    this.updateProfil = {
      id: sessionStorage.getItem('id'),
      nom: nom,
      prenom: prenom,
      adresse: adresse,
      codePostal: codePostal,
      ville: ville,
      proprietaireCarte: proprietaireCarte,
      numeroCarte: numeroCarte,
      dateCarte: dateCarte,
      cryptogramme: cryptogramme,
      civilite: civilite
    }
    this.updateProfil = JSON.stringify(this.updateProfil);
    this.http.post('http://test-mission3/update_facturation.php', this.updateProfil).subscribe(
      (response: any) => {
        if (response['success']) {
          alert('Votre profil de facturation a bien été mis à jour')
        }
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
    
  }


}
