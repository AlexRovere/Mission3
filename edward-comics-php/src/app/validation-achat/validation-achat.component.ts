import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IComics } from 'src/models/comic.model';
import { IAppInfoFacturationUser } from 'src/models/user.model';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-validation-achat',
  templateUrl: './validation-achat.component.html',
  styleUrls: ['./validation-achat.component.css']
})
export class ValidationAchatComponent implements OnInit {

  formCarte!: FormGroup;
  errorMessage!: String;
  cartSubscription!: Subscription;
  nbrItemSubscription!: Subscription;
  cart: IComics[] = []
  total = 0;
  nbrItem = 0;

  infoUser: IAppInfoFacturationUser = {
    nom: '',
    prenom: '',
    adresse: '',
    codePostal: 0,
    ville: '',
    proprietaireCarte: '',
    numeroCarte: 0,
    dateCarte: '',
    cryptogramme: 0,
    civilite: ''
  }

  

  constructor(private formBuilder: FormBuilder, private router: Router, private panierService: PanierService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getFacturationInfo(sessionStorage.getItem('id'));
    this.cartSubscription = this.panierService.cartSubject.subscribe(
      (cart: IComics[]) => {
        this.cart = cart;
      }
    );
    this.nbrItemSubscription = this.panierService.nbrItemSubject.subscribe(
      (nbrItem: number) => {
        this.nbrItem = nbrItem;
      }
    );
    this.panierService.emitCart();
    this.getTotal();
  }

  initForm() {
    this.formCarte = this.formBuilder.group({
      proprietaire: ['', [Validators.pattern(/[a-zA-Z]/), Validators.required, Validators.maxLength(255)]],
      nbCarte: ['', [Validators.pattern(/[0-9]/), Validators.required, Validators.maxLength(16)]],
      expiration: ['', [Validators.pattern(/[0-9]/), Validators.required, Validators.maxLength(255)]],
      cryptogramme: ['', [Validators.pattern(/[0-9]/), Validators.required, Validators.maxLength(3)]]
    });
  }

  updateCarte() {
    let proprietaireCarte = this.formCarte.get('proprietaire')?.value;
    let numeroCarte = this.formCarte.get('nbCarte')?.value;
    let dateCarte = this.formCarte.get('expiration')?.value;
    let cryptogramme = this.formCarte.get('cryptogramme')?.value;
    let id = sessionStorage.getItem('id');

    
    if(proprietaireCarte != ""){
      proprietaireCarte = this.formCarte.get('proprietaire')?.value;
    }else {
      proprietaireCarte = this.infoUser.proprietaireCarte;
    }
    if(numeroCarte != ""){
      numeroCarte = this.formCarte.get('nbCarte')?.value;
    }else {
      numeroCarte = this.infoUser.numeroCarte;
    }
    if(dateCarte != ""){
      dateCarte = this.formCarte.get('expiration')?.value;
    }else {
      dateCarte = this.infoUser.dateCarte;
    }
    if(cryptogramme != ""){
      cryptogramme = this.formCarte.get('cryptogramme')?.value;
    }else {
      cryptogramme = this.infoUser.cryptogramme;
    }

    let userCarteInfo = {
      proprietaireCarte : proprietaireCarte,
      numeroCarte : numeroCarte,
      dateCarte : dateCarte,
      cryptogramme : cryptogramme,
      id : id
    }
    // https://edward-comics.000webhostapp.com/update_carte.php
    let data = JSON.stringify(userCarteInfo);
    this.http.post('http://edward/update_carte.php', data).subscribe(
      (response: any) => {
        if (response['success']) {
          alert('Information de CB correctement modifié')
        }
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
  }

  getTotal(){
    for(let item of this.cart){
      if(item.quantite > 1){
        this.total += (item.prix)*(item.quantite);
      }
      else{
        this.total += item.prix;
      }
    }
  }

  getFacturationInfo(id: any) {
    // https://edward-comics.000webhostapp.com/get_facturation.php
    let user = JSON.stringify(id);
    this.http.post('http://edward/get_facturation.php', user).subscribe(
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


}
