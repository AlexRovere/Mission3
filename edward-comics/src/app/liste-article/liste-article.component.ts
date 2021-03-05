import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IComics } from 'src/models/comic.model';
import { ComicsService } from '../services/comics.service';

@Component({
  selector: 'app-liste-article',
  templateUrl: './liste-article.component.html',
  styleUrls: ['./liste-article.component.css']
})
export class ListeArticleComponent implements OnInit {

  comics!: Array<IComics>;
  comicsSubscription!: Subscription;

  constructor(private comicsService: ComicsService, private router: Router) { 
   }

  ngOnInit(): void {
    this.comicsSubscription = this.comicsService.comicsSubject.subscribe(
      (comics: Array<IComics>) => {
        this.comics = comics;
      }
    );
    this.comicsService.emitComics()
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
  


}
