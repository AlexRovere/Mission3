import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PanierService } from '../services/panier.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nbrItemSubscription!: Subscription;
  nbrItem = 0;

  constructor(private panierService: PanierService) {
   
   }

  ngOnInit(): void {
    this.nbrItemSubscription = this.panierService.nbrItemSubject.subscribe(
      (nbrItem: number) => {
        this.nbrItem = nbrItem;
      }
    );
    this.panierService.emitCart();
  }

}
