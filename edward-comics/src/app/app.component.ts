import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyDULLQOrVBhcMJV1F49cZvWRbMdH-5c0qs",
      authDomain: "mission3-69b2b.firebaseapp.com",
      projectId: "mission3-69b2b",
      storageBucket: "mission3-69b2b.appspot.com",
      messagingSenderId: "641873096537",
      appId: "1:641873096537:web:cce921bf31f8c614b16648"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  }
  cloneDatabase(){
    const firestore = firebase.firestore()
    const collectionRef = firestore.collection("Comics");
    const batch = firestore.batch();

    fetch('assets/bdd.json')
    .then(res => res.json())
    .then((data)=>{
      for(let doc of data.Comics){
        const docRef = collectionRef.doc();
        batch.set(docRef, doc);
      }
      batch.commit()
      .then(() => console.log('ok'))
      .catch(err => console.error(err));
    })







  //   firebase.firestore().collection("Comics").add({
  //     "avis" : 5,
  //     "categorie" : "Super-vilains",
  //     "date" : "12/06/2020",
  //     "dessinateur" : "Sejic Stjepan",
  //     "disponibilite" : 2,
  //     "editeur" : "Urban Comics",
  //     "isbn" : 1026816068,
  //     "nbr-pages" : 224,
  //     "nouveaute" : true,
  //     "photo" : "assets/img/Harleen.png",
  //     "prix" : "20€",
  //     "promotion" : false,
  //     "resume" : "Après des études mouvementées qui ont entamé sa confiance en elle, la jeune psychologue Harleen Quinzel pense enfin avoir décroché le poste de ses rêves en étant embauchée à l’Asile d’Arkham afin d’apporter son soutien et son expertise aux plus grands criminels de Gotham. Mais il est un être au sein de cet asile qui va à la fois faire chavirer son esprit et son cœur : le Joker ! Petit à petit, Harleen va se laisser séduire puis sombrer dans un abîme de folie y laissant à tout jamais son innocence et ses illusions perdues.",
  //     "scenariste" : "Sejic Stjepan",
  //     "selection" : false,
  //     "titre" : "Harleen",
  //     "univers" : "DC Comics"
  //   }).then((docRef) => {
  //     console.log("Document written with ID: ", docRef.id);
  //   }).catch((error) => {
  //     console.error("Error adding document: ", error);
  // });
  
  }
}
