import { Component, Input, OnInit } from '@angular/core';
import { IComics } from 'src/models/comic.model';
import { ComicsService, IcomicsFilterOrder } from '../services/comics.service';

@Component({
  selector: 'app-carousel-image',
  templateUrl: './carousel-image.component.html',
  styleUrls: ['./carousel-image.component.css']
})
export class CarouselImageComponent implements OnInit {

  comics!: Array<IComics>;
  responsiveOptions = [{}];

  @Input() config!: IcomicsFilterOrder 

  constructor(private comicsService: ComicsService) {
    this.responsiveOptions =
    [
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      }
    ]
  }




  ngOnInit(): void {
    this.comicsService.getFilterComics(this.config)
    .then((newComics: Array<IComics>) => {
      this.comics = newComics;
      console.log(this.config)
    })

  }


}
