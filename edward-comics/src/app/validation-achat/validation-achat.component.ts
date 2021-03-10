import { Component, OnInit } from '@angular/core';
import { IAppInfoFacturationUser } from 'src/models/user.model';

@Component({
  selector: 'app-validation-achat',
  templateUrl: './validation-achat.component.html',
  styleUrls: ['./validation-achat.component.css']
})
export class ValidationAchatComponent implements OnInit {

  infoUser: IAppInfoFacturationUser = {
    nom: 'Pastore de vardo',
    prenom: 'Sacha',
    adresse: '110 rue Daguerre',
    codePostal: 83150,
    ville: 'Bandol',
    proprietaireCarte: 'Pastore de Vardo',
    numeroCarte: 5464685763548,
    dateCarte: '22/08',
    cryptogramme: 745,
    civilite: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
