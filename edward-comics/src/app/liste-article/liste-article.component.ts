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
    document.getElementById(`${i}`)?.classList.replace('description', 'description-hover')
  }
  hideDescription(i:number){
    document.getElementById(`${i}`)?.classList.replace('description-hover', 'description')
  }


}
