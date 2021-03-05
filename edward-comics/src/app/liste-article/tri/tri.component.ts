import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Subscription } from 'rxjs';
import { ComicsService } from 'src/app/services/comics.service';
import { IComics } from 'src/models/comic.model';

@Component({
  selector: 'app-tri',
  templateUrl: './tri.component.html',
  styleUrls: ['./tri.component.css']
})
export class TriComponent implements OnInit {

  comics!: Array<IComics>;
  comicsSubscription!: Subscription;
  db = firebase.firestore();

  constructor(private comicsService: ComicsService, private router: Router) { }

  ngOnInit(): void {
    this.comicsSubscription = this.comicsService.comicsSubject.subscribe(
      (comics: Array<IComics>) => {
        this.comics = comics;
      }
    );
    this.comicsService.emitComics()
  }

  titreAsc() {
    var comicsRef = this.db.collection("Comics");
    comicsRef.orderBy("titre", "asc")
    .get()
    .then((querySnapshot) => {
      const newComics: Array<IComics> = [];
      querySnapshot.forEach((_doc) => {
        newComics.push(_doc.data() as IComics);
        // this.comics = _doc.data() as any;
        
        // console.log(this.comics)
      })
      this.comics = newComics;
      console.log(this.comics)
    });

  }

}
