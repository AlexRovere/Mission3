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
      apiKey: "AIzaSyDULLQOrVBhcMJV1F49cZvWRbMdH-5c0qs",
      authDomain: "mission3-69b2b.firebaseapp.com",
      databaseURL: "https://mission3-69b2b-default-rtdb.europe-west1.firebasedatabase.app/",
      projectId: "mission3-69b2b",
      storageBucket: "mission3-69b2b.appspot.com",
      messagingSenderId: "641873096537",
      appId: "1:641873096537:web:cce921bf31f8c614b16648"
    };
    firebase.initializeApp(firebaseConfig);
  }
}