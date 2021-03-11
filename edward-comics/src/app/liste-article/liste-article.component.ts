import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { IComics } from 'src/models/comic.model';
import { ComicsService, IcomicsFilterOrder, IComicsRequestOrder } from '../services/comics.service';
import { ModalService } from '../services/modal.service';
import { PanierService } from '../services/panier.service';


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

  constructor(private route: ActivatedRoute, private comicsService: ComicsService, private router: Router, private modalService : ModalService, private panierService: PanierService) { 

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
    switch (orderInfo.colName) {
      case 'titre' : 
        if(orderInfo.order === 'asc') {
          this.comics.sort(function compare(a, b) {
            if (a.titre < b.titre) {
              return -1;
            }
            if (a.titre > b.titre){
                return 1;
            }
          return 0;
          })
        } else { 
          this.comics.sort(function compare(a, b) {
            if (a.titre > b.titre) {
              return -1;
            }
            if (a.titre < b.titre){
                return 1;
            }
          return 0;
          })
        };
        break;
      case 'prix':
      if(orderInfo.order === 'asc') {
        this.comics.sort((a, b) => a.prix - b.prix);
      }else {
        this.comics.sort((a, b) => b.prix - a.prix);
      }
      break;
      case 'avis':
      if(orderInfo.order === 'asc') {
        this.comics.sort((a, b) => a.avis - b.avis);
      }else {
        this.comics.sort((a, b) => b.avis - a.avis);
      }
      break;  
      }        
    }       
  
  onFilterChanged(filterInfo: IcomicsFilterOrder){
    const themeCol = filterInfo.theme;
    const value = filterInfo.valeur;
    this.pagination();
    this.comicsService.getFilterComics(filterInfo)
      .then((newComics: Array<IComics>) => {
        this.router.navigate(['/liste', themeCol, value]);
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
    this.addToCart(object);    
  }

  addToCart(comic: IComics){
    this.panierService.addItemsToCart(comic)
  }
 pagination(){
   this.p = 1;
 }

}
