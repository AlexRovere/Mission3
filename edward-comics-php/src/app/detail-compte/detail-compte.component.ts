import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detail-compte',
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.css']
})
export class DetailCompteComponent implements OnInit {

  updateForm!: FormGroup;
  errorMessage!: String;

  infoUser: any = [];
  updateProfil: any = {};



  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private http : HttpClient) {   

  }


  ngOnInit(): void {
   this.getUserInfo(sessionStorage.getItem('id'));
    this.initForm();
  }



  getUserInfo(id: any) {
    // https://edward-comics.000webhostapp.com/info_user.php
    let user = JSON.stringify(id);
    this.http.post('http://test-mission3/info_user.php', user).subscribe(
      (response: any) => {
        if (response['success']) {
          this.infoUser = response['user'];
        }
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
  }


  initForm() {
    this.updateForm = this.formBuilder.group({
      telephone: ['', [Validators.pattern(/^[0-9]+$/), Validators.maxLength(30)]],
      nom: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]],
      prenom: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.maxLength(255)]]
    });
  }
  updateUser() {
    let id = sessionStorage.getItem('id');
    let nom = this.updateForm.get('nom')?.value;
    let prenom = this.updateForm.get('prenom')?.value;
    let telephone = this.updateForm.get('telephone')?.value;

    if(nom != ""){
      nom = this.updateForm.get('nom')?.value;
    } else {
      nom = this.infoUser.nom;
    }
    if(prenom != ""){
      prenom = this.updateForm.get('prenom')?.value;
    }else {
      prenom = this.infoUser.prenom;
    }
    if(telephone != 0){
      telephone = this.updateForm.get('telephone')?.value;
    }else {
      telephone = this.infoUser.telephone;
    }

    this.updateProfil = {
      nom : nom,
      prenom : prenom, 
      id : id,
      telephone : telephone
    }
    // https://edward-comics.000webhostapp.com/update_user.php
    
    this.updateProfil = JSON.stringify(this.updateProfil);
    this.http.post('http://test-mission3/update_user.php', this.updateProfil).subscribe(
      (response: any) => {
        if (response['success']) {
          alert('Votre profil a bien été mis à jour')
        }
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
    
  }
}
