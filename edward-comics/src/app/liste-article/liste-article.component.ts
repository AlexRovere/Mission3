import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { IComics } from 'src/models/comic.model';
import { ComicsService, IcomicsFilterOrder, IComicsRequestOrder } from '../services/comics.service';
import { ModalService } from '../services/modal.service';
import { MatPaginator } from '@angular/material/paginator';

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

  
p!: number;

  constructor(private route: ActivatedRoute, private comicsService: ComicsService, private router: Router, private modalService : ModalService) { 

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
    });
    this.p = 1;

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
    this.pagination();
    this.comicsService.getFilterComics(filterInfo)
      .then((newComics: Array<IComics>) => {
        this.comics = newComics;
      })
  }

  onViewComic(id: string) {
    this.router.navigate(['/liste', 'view', id]);
  }

  enableModal(object: IComics) {
    this.modalService.comic = object ;
    this.modalService.showModal();
    this.modalService.emitComic();
  }
 pagination(){
   this.p = 1;
 }

}
