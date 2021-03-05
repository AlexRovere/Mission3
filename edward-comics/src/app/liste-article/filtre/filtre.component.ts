import { Component, EventEmitter, Output } from '@angular/core';
import { IcomicsFilterOrder } from 'src/app/services/comics.service';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})
export class FiltreComponent {

  @Output()
  public onChange: EventEmitter<IcomicsFilterOrder> = new EventEmitter<IcomicsFilterOrder>();
  
  public setFilter(theme: string, valeur: string){
    this.onChange.next({
      theme,
      valeur
    });
  }
  
  
}
