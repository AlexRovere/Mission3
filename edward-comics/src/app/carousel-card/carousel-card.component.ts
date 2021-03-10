import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComics } from '../../models/comic.model';
import { ComicsService, IcomicsFilterOrder } from '../services/comics.service';
import { ModalService } from '../services/modal.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {

  comics!: Array<IComics>;

  @Input() config!: IcomicsFilterOrder 
  
  constructor(private comicsService: ComicsService, private modalService: ModalService, private panierService: PanierService, private router: Router) {    
  }
  responsiveOptions =[
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
  }
  ]

  ngOnInit(): void {
    this.comicsService.getFilterComics(this.config)
    .then((newComics: Array<IComics>) => {
      this.comics = newComics;
    })

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
  onViewComic(id: string) {
    this.router.navigate(['/liste', 'view', id]);
  }


}
