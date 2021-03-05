import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';

export interface IAppInfoUser {
  adresse: string,
  codePostal: number,
  email: string,
  nom: string,
  prenom: string,
  telephone: number,
  ville: string
}

@Component({
  selector: 'app-detail-compte',
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.css']
})
export class DetailCompteComponent implements OnInit {

  infoUser!: IAppInfoUser;

  db = firebase.firestore();

  constructor(private authService: AuthService) {
    this.db.collection("Users").where("email", "==", this.authService.user)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.infoUser = doc.data() as IAppInfoUser;
          // console.log(doc.id, " => ", doc.data());
          console.log(this.infoUser);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  ngOnInit(): void {
  }

}
