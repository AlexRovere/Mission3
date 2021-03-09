import { Component, Input, OnInit } from '@angular/core';
import { IComics } from '../../models/comic.model';
import { ComicsService, IcomicsFilterOrder } from '../services/comics.service';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {

  comics!: Array<IComics>;

  @Input() config!: IcomicsFilterOrder 
  
  constructor(private comicsService: ComicsService) {    
  }
  responsiveOptions =[
    {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 2,
      numScroll: 1
  }
  ]

  ngOnInit(): void {
    this.comicsService.getFilterComics(this.config)
    .then((newComics: Array<IComics>) => {
      this.comics = newComics;
      console.log(this.config)
    })

  }


}
