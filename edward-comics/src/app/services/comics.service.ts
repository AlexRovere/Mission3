import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IComics } from 'src/models/comic.model';
import firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  comics: IComics[] = [];
  comicsSubject = new Subject<any>();
  constructor() { 
    this.getComics();
  }

  emitComics()
  {
    this.comicsSubject.next(this.comics);
  }
  getComics() {
      const db = firebase.firestore();
      db.collection("Comics").get().then(
        (querySnapshot) => {
          querySnapshot.forEach((_doc) => {
            const doc = _doc.data();
            if(doc){
              this.comics.push(doc as any);
            }
          })
          this.emitComics();
        }
      )
      }

    

  getSingleComic(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Comics' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

}
