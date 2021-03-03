import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'edward-comics';
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyAyaiabM6EDPvMIzSKwq8M37jJQDxpkmHQ",
      authDomain: "edward-comics.firebaseapp.com",
      databaseURL: "https://edward-comics-default-rtdb.europe-west1.firebasedatabase.app/",
      projectId: "edward-comics",
      storageBucket: "edward-comics.appspot.com",
      messagingSenderId: "930276707236",
      appId: "1:930276707236:web:c40bf741eca686c39c8f31"
    };
    firebase.initializeApp(firebaseConfig);
  }
}