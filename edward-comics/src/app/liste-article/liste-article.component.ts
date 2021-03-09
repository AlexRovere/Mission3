import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComics } from 'src/models/comic.model';
import { ComicsService, IcomicsFilterOrder, IComicsRequestOrder } from '../services/comics.service';

@Component({
  selector: 'app-liste-article',
  templateUrl: './liste-article.component.html',
  styleUrls: ['./liste-article.component.css']
})
export class ListeArticleComponent implements OnInit {

  comics!: Array<IComics>;


  constructor(private comicsService: ComicsService, private router: Router) { 
   }

  ngOnInit(): void {
    this.comicsService.getComicsPromise()
      .then((newComics: Array<IComics>) => {
        this.comics = newComics;
      })
  }

  showDescription(i:number){
    const md = window.matchMedia("(min-width: 1280px)")
    if(md.matches){
      document.getElementById(`${i}`)?.classList.replace('description', 'description-hover')
    }
    else{
      return
    }
  }
  hideDescription(i:number){
    const md = window.matchMedia("(min-width: 1280px)")
    if(md.matches){
      document.getElementById(`${i}`)?.classList.replace('description-hover', 'description')
    }
    else{
      return
    }
  }
  
  onOrderChanged(orderInfo: IComicsRequestOrder){
    this.comicsService.getOrderedComics(orderInfo)
      .then((newComics: Array<IComics>) => {
        this.comics = newComics;
      })
  }
  
  onFilterChanged(filterInfo: IcomicsFilterOrder){
    this.comicsService.getFilterComics(filterInfo)
      .then((newComics: Array<IComics>) => {
        this.comics = newComics;
      })
  }

  onViewComic(id: string) {
    this.router.navigate(['/liste', 'view', id]);
  }
}
