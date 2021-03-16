import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Subject } from 'rxjs';
import { IUser } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user!: any;
  userSubject = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  emitUser(){
    this.userSubject.next(this.user);
  }

  createNewUser(user: IUser){
    let userData = JSON.stringify(user);
    this.http.post('https://edward-comics.000webhostapp.com/inscription.php', userData).subscribe(
    (response) => { 
      console.log(response);
      if(response){
        this.router.navigate(['/auth/signin']);
      }else{
        alert('Error !');
      }
    },
    (error) => console.log(error)
  ) 
  }
  
  signInUser(object : object) {
    let userData = JSON.stringify(object);
    this.http.post('https://edward-comics.000webhostapp.com/inscription.php', userData).subscribe(
    (response) => { 
      console.log(response);
      if(response){
        this.router.navigate(['/detail-compte']);
      }else{
        alert('Error !');
      }
    },
    (error) => console.log(error)
  ) 

  signOutUser() {
    firebase.auth().signOut();
  }


}
