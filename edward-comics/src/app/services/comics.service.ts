import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IComics } from 'src/models/comic.model';
import firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  comics: IComics = {
    avis: 1,
    categorie: "",
    date: "",
    dessinateur: "",
    disponibilite: 1,
    editeur: "",
    isbn: 1,
    nbrpages: 1,
    nouveaute: false,
    photo: "",
    prix: "",
    pomotion: false,
    resume: "",
    scenariste: "",
    selection: false,
    titre: "",
    univers: ""
  };
  comicsSubject = new Subject<any>();
  constructor() { 
    this.getComics();
  }

  emitComics()
  {
    this.comicsSubject.next(this.comics);
  }
  getComics() {
    firebase.database().ref('/Comics')
      .on('value', (data: DataSnapshot) => {
        this.comics = data.val() ? data.val(): [];
        this.emitComics();
        
      })
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
