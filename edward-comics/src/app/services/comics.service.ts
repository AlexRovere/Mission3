import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IComics } from 'src/models/comic.model';
import firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot

export interface IComicsRequestOrder {
  colName: string, 
  order: "asc" | "desc"
}

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
    this.getComicsPromise()
      .then(newComics => {
        this.comics = newComics;
        this.emitComics();
      })
  }

  getComicsPromise(): Promise<Array<IComics>>{
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection("Comics")
        .get()
        .then(
          (querySnapshot) => {
            querySnapshot.forEach((_doc) => {
              const doc = _doc.data();
              if(doc){
                this.comics.push(doc as any);              
              }
            })
            resolve(this.comics)
          }
        )
        .catch(reject);
      });
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


  getOrderedComics(orderInfo: IComicsRequestOrder): Promise<Array<IComics>> {
    const orderCol = orderInfo.colName || "titre";
    const order = orderInfo.order || "asc";
    const db = firebase.firestore();
    var comicsRef = db.collection("Comics");

    return new Promise((resolve, reject) => {
      comicsRef.orderBy(orderCol, order)
        .get()
        .then((querySnapshot) => {
          const newComics: Array<IComics> = [];
          querySnapshot.forEach((_doc) => {
            newComics.push(_doc.data() as IComics);
          })
          resolve(newComics);
        })
        .catch(reject);
    })
    
  }

}
