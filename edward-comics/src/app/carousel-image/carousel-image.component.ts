import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComics } from 'src/models/comic.model';
import { ComicsService, IcomicsFilterOrder } from '../services/comics.service';

export enum State {
  left =  "left",
  right = "right"
}

@Component({
  selector: 'app-carousel-image',
  templateUrl: './carousel-image.component.html',
  styleUrls: ['./carousel-image.component.css']
})
export class CarouselImageComponent implements OnInit {

  comics!: Array<IComics>;
  State = State;

  statut!: State;

  @Input() config!: IcomicsFilterOrder

  constructor(private comicsService: ComicsService, private router: Router) { }

  ngOnInit(): void {
    this.comicsService.getFilterComics(this.config)
      .then((newComics: Array<IComics>) => {
        this.comics = newComics;
      })

  }
  firstItemIdx = 0;


  shiftLeft() {
    this.firstItemIdx = (this.firstItemIdx - 1) % this.comics.length;
    return this.statut = State.left;
  }

  shiftRight() {
    this.firstItemIdx = (this.firstItemIdx + 1) % this.comics.length;
    return this.statut = State.right;
  }

  getOrderedItems() {
    if (!this.comics) {
      return [];
    }
    const start = this.comics.slice(this.firstItemIdx);
    const end = this.comics.slice(0, this.firstItemIdx);
    return [...start, ...end];
  }

  getSlideClass(itemIndex: number) {
    const itemClasses = ['item'];
    const md = window.matchMedia("(min-width: 1280px)")
    if(md.matches){
      if (itemIndex < 5 ) {
        itemClasses.push(`move-to-position${itemIndex + 1}-from-${this.statut}`);
      }else {
        itemClasses.push('hide');
      }
    }
    else {
      if (itemIndex < 3 ) {
        itemClasses.push(`move-to-position${itemIndex + 1}-from-${this.statut}`);
      }else {
        itemClasses.push('hide');
      }
    }


    return itemClasses.join(' ');
  }
  onViewComic(id: string) {
    this.router.navigate(['/liste', 'view', id]);
  }

}
