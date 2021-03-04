import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  items!: MenuItem[];


  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
         label:'Accueil',
         icon:'pi pi-fw pi-home',
      },
      {
         label:'Promo',
         icon:'pi pi-euro',
      },
      {
        label:'Sélection du moment',
        icon:'pi pi-heart',
      },
      {
      label:'Nouveautés',
      icon:'pi pi-bell',
      },

      {
      label:'Univers',
      items:[
            {
               label:'DC Comics',
               icon:'pi pi-minus',

            },
            {
               label:'Marvel',
               icon:'pi pi-minus',

            },
         ]
      },
      {
      label:'Séries',
      items:[
          {
              label:'Batman',
              icon:'pi pi-minus',
          },
          {
              label:'Superman',
              icon:'pi pi-minus',
          },
        ]
      },
      {
      label:'Catégories',
      items:[
          {
              label:'Super-héros',
              icon:'pi pi-minus',
          },
          {
              label:'Super-vilains',
              icon:'pi pi-minus',
          },
          {
              label:'Super-girls',
              icon:'pi pi-minus',
          },
          {
              label:'Nemesis',
              icon:'pi pi-minus',
          }, 
        ]
      },
           
      {
         separator:true
      },
      {
         label:'Retour',
         icon: ""
      }
  ];
}    

}
