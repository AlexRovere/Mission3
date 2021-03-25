import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IComics } from 'src/models/comic.model';



export interface IComicsRequestOrder {
  colName: string,
  order: "asc" | "desc"
}

export interface IcomicsFilterOrder {
  theme: string,
  valeur: string | boolean
}

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  PHP_API_SERVER = "https://edward-comics.go.yj.fr/php";

  comics: IComics[] = [];
  comicsSubject = new Subject<any>();
  results: {} | any = {};
  comicsArray = [] as any;
  book!: IComics;


  constructor(private httpClient: HttpClient) {

  }


  getAllComics(): Observable<IComics[]> {
    return this.httpClient.get<IComics[]>(`${this.PHP_API_SERVER}/bdd.php`);
  }




  getSingleComic(id: number): Observable<IComics> {
    return this.httpClient.get<IComics>(`${this.PHP_API_SERVER}/singleComic.php/?id=${id}`);
  }



  getFilterComics(filterInfo: IcomicsFilterOrder): Observable<IComics[]> {
    const themeCol = filterInfo.theme || "univers";
    const value = filterInfo.valeur || "Marvel";
    return this.httpClient.get<IComics[]>(`${this.PHP_API_SERVER}/filtre.php/?theme=${themeCol}&valeur=${value}`);
  }

  getSearchComics(searchText: string): Observable<IComics[]> {
    return this.httpClient.get<IComics[]>(`${this.PHP_API_SERVER}/search.php/?searchText=${searchText}`);
  }

  convertGroup(url:string) {
    this.httpClient.get(url).subscribe(
      (data) => {
        this.comicsArray = data;
        if (this.comicsArray != null) {
          for (let comic of this.comicsArray) {
            const metas = comic['meta_data']
            for (let meta of metas) {
              if (meta.id % 2 === 0) {
                let pair = meta.value;
                let key = meta.key;
                this.results[key] = pair
              }
            }
            this.book = {
              id: comic.id,
              avis: Number(this.results.avis),
              categorie: this.results.categorie,
              date: this.results.date,
              dessinateur: this.results.dessinateur,
              disponibilite: Number(this.results.disponibilite),
              editeur: this.results.editeur,
              isbn: Number(this.results.isbn),
              nbrPages: Number(this.results.nbrpages),
              nouveaute: this.parseBool(this.results.nouveaute),
              photo: comic.images[0].src,
              prix: Number(comic.price),
              promotion: this.parseBool(this.results.promotion),
              resume: comic.description,
              scenariste: this.results.scenariste,
              selection: this.parseBool(this.results.selection),
              titre: comic.titre,
              univers: this.results.univers,
              quantite: Number(this.results.quantite)
            }
            this.comics.push(this.book)
          }  
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  convertSingle(id: number, url:string){
    this.httpClient.get(url).subscribe(
      (data) => {
        this.comicsArray = data;
        if (this.comicsArray != null) {
            const metas = this.comicsArray[id]['meta_data']
            for (let meta of metas) {
              if (meta.id % 2 === 0) {
                let pair = meta.value;
                let key = meta.key;
                this.results[key] = pair
              }
            }
            this.book = {
              id: id,
              avis: Number(this.results.avis),
              categorie: this.results.categorie,
              date: this.results.date,
              dessinateur: this.results.dessinateur,
              disponibilite: Number(this.results.disponibilite),
              editeur: this.results.editeur,
              isbn: Number(this.results.isbn),
              nbrPages: Number(this.results.nbrpages),
              nouveaute: this.parseBool(this.results.nouveaute),
              photo: this.comicsArray.images[0].src,
              prix: Number(this.comicsArray.price),
              promotion: this.parseBool(this.results.promotion),
              resume: this.comicsArray.description,
              scenariste: this.results.scenariste,
              selection: this.parseBool(this.results.selection),
              titre: this.comicsArray.titre,
              univers: this.results.univers,
              quantite: Number(this.results.quantite)
            }
            this.comics.push(this.book)
          }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  parseBool(value: string): boolean {
    switch (value) {
      case '1':
        return true;
      default:
        return false;
    }
  }

}

