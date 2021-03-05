import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IComics } from '../../models/comic.model';
import { ComicsService } from '../services/comics.service';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {

  comics!: Array<IComics>;
  comicsSubscription!: Subscription;

  constructor(private comicsService: ComicsService) { }
  responsiveOptions =
  {

  }
 
products  = [
  {
    id: 4,
    code:"6532",
    name:"test",
    description:"nice",
    price:500,
    quantity:6,
    inventoryStatus:"avaible",
    category:"été",
    image: "../assets/img/spawn.jpg",
    rating:5
  },
  {
    id: 4,
    code:"6532",
    name:"test2",
    description:"nice",
    price:5000,
    quantity:6,
    inventoryStatus:"avaible",
    category:"été",
    image: "../assets/img/spawn.jpg",
    rating:5
  },
  {
    id: 4,
    code:"6532",
    name:"test3",
    description:"nice",
    price:300,
    quantity:6,
    inventoryStatus:"avaible",
    category:"été",
    image: "../assets/img/spawn.jpg",
    rating:5
  },
  {
    id: 4,
    code:"6532",
    name:"test4",
    description:"nice",
    price:6500,
    quantity:6,
    inventoryStatus:"avaible",
    category:"été",
    image: "../assets/img/spawn.jpg",
    rating:5
  }
]

  ngOnInit(): void {
    this.comicsSubscription = this.comicsService.comicsSubject.subscribe(
      (comics: Array<IComics>) => {
        this.comics = comics;
      }
    );
  }

}
