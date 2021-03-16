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
  PHP_API_SERVER = "https://edward-comics.000webhostapp.com";
  comics: IComics[] = [];
  comicsSubject = new Subject<any>();
  
  
  constructor(private httpClient: HttpClient) { 
  
  }

  
  getAllComics(): Observable<IComics[]> {
    return this.httpClient.get<IComics[]>(`${this.PHP_API_SERVER}/bdd.php`);
  }


  

  getSingleComic(id: number): Observable<IComics>{
   return this.httpClient.get<IComics>(`${this.PHP_API_SERVER}/singleComic.php/?id=${id}`);
  }          
    
    
  // getOrderedComics(orderInfo: IComicsRequestOrder): Promise<Array<IComics>> {
  //   const orderCol = orderInfo.colName || "titre";
  //   const order = orderInfo.order || "asc";
  //   const db = firebase.firestore();
  //   var comicsRef = db.collection("Comics");

  //   return new Promise((resolve, reject) => {
  //     comicsRef.orderBy(orderCol, order)
  //       .get()
  //       .then((querySnapshot) => {
  //         const newComics: Array<any> = [];          
  //         querySnapshot.forEach((_doc) => {
  //           const doc = _doc.data() as any;
  //           newComics.push({
  //             ...doc,
  //             id: _doc.id
  //           });
  //         })
  //         resolve(newComics);
  //       })
  //       .catch(reject);
  //   })
    
  // }
  
  
  getFilterComics(filterInfo: IcomicsFilterOrder): Observable<IComics[]> {
    const themeCol = filterInfo.theme || "univers";
    const value = filterInfo.valeur || "Marvel";
    return this.httpClient.get<IComics[]>(`${this.PHP_API_SERVER}/filtre.php/?theme=${themeCol}&valeur=${value}`);   
  }

  getSearchComics(searchText: string): Observable<IComics[]> {
    return this.httpClient.get<IComics[]>(`${this.PHP_API_SERVER}/search.php/?searchText=${searchText}`);
  }
}

