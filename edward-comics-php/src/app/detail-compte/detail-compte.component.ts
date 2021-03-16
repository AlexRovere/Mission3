import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { IAppInfoUser } from 'src/models/user.model';
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

  id!: string;


  db = firebase.firestore();
  auth = firebase.auth();

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private http : HttpClient) {
    this.db.collection("Users").where("email", "==", this.authService.user)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.infoUser = doc.data() as IAppInfoUser;
          this.id = doc.id;
          
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

  }


  ngOnInit(): void {
    this.getUserInfo(this.authService.user);
    this.initForm();
  }



  getUserInfo(id: number) {
    let user = JSON.stringify(id);
    this.http.post('https://edward-comics.000webhostapp.com/info_user.php', user).subscribe(
      (response) => {
        if (response) {
          ////////////////////////////////////////////////
          this.http.get('https://edward-comics.000webhostapp.com/info_user.php').subscribe((data) => {
          this.infoUser.push(data);
        },
          (error) => console.error(error));
           }
          ///////////////////////////////////////////////
         else {
          alert('Error !');
        }
      },
      (error) => console.log(error)
    );
  }


  initForm() {
    this.updateForm = this.formBuilder.group({
      telephone: ['', [Validators.pattern(/[0-9]/)]],
      nom: ['', [Validators.pattern(/[a-zA-Z]/)]],
      prenom: ['', [Validators.pattern(/[a-zA-Z]/)]]
    });
  }

  updateUser() {

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

    this.db.collection("Users").doc(this.id).update({
      nom: nom,
      prenom: prenom,
      telephone: telephone
    }).then(
      () => {
        console.log('Modification réussie !');
        alert('Modification réussie !');
      }
    ).catch(
      (error) => {
        console.log("Il y à une erreur : " + error);
        alert("Il y à une erreur : " + error);
      }
    );
  }
}
