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
  // https://edward-comics.go.yj.fr/php
  PHP_API_SERVER = "http://edward/php";
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
    
  
  
  getFilterComics(filterInfo: IcomicsFilterOrder): Observable<IComics[]> {
    const themeCol = filterInfo.theme || "univers";
    const value = filterInfo.valeur || "Marvel";
    return this.httpClient.get<IComics[]>(`${this.PHP_API_SERVER}/filtre.php/?theme=${themeCol}&valeur=${value}`);   
  }

  getSearchComics(searchText: string): Observable<IComics[]> {
    return this.httpClient.get<IComics[]>(`${this.PHP_API_SERVER}/search.php/?searchText=${searchText}`);
  }
}

