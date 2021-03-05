import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Subscription } from 'rxjs';
import { ComicsService, IComicsRequestOrder } from 'src/app/services/comics.service';
import { IComics } from 'src/models/comic.model';

@Component({
  selector: 'app-tri',
  templateUrl: './tri.component.html',
  styleUrls: ['./tri.component.css']
})
export class TriComponent {

  @Output()
  public onChange: EventEmitter<IComicsRequestOrder> = new EventEmitter<IComicsRequestOrder>(); 

  public setOrder(colName: string, bDescending = false){
    this.onChange.next({
      colName,
      order: bDescending ? "desc" : "asc"
    });
  }

}
