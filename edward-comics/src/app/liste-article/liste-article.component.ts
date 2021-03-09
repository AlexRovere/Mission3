import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComics } from 'src/models/comic.model';
import { ComicsService, IcomicsFilterOrder, IComicsRequestOrder } from '../services/comics.service';

@Component({
  selector: 'app-liste-article',
  templateUrl: './liste-article.component.html',
  styleUrls: ['./liste-article.component.css']
})
export class ListeArticleComponent implements OnInit {

  comics!: Array<IComics>;
  filter: IcomicsFilterOrder = {
    theme: "",
    valeur: ""
  };

  constructor(private route: ActivatedRoute, private comicsService: ComicsService, private router: Router) { 
   }

  ngOnInit(): void {  
    this.route.paramMap.subscribe(params => {
      const _theme = params.get('theme');
      let _valeur: string | boolean | null = params.get('valeur');
      if(params.get('valueType') === 'boolean'){
        if(_valeur === "true"){
          _valeur = true;
        }else{
          _valeur = false;
        }
      }
      if(_theme != null && _valeur != null){
        this.updateFilter(_theme, _valeur);
      }
    })
  }

  updateFilter(theme: string, value: string | boolean){
    this.filter.theme = theme;
    this.filter.valeur = value;
    this.comicsService.getFilterComics(this.filter).then(
      (newComics: Array<IComics>) => {
        this.comics = newComics;
        console.log(value)
      }
    )
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
