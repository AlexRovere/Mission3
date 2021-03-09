import { Component, OnInit } from '@angular/core';
import { ComicsService, IcomicsFilterOrder } from '../services/comics.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})



export class ContactComponent implements OnInit {


  constructor(private comicsService: ComicsService) { }

  ngOnInit(): void {  }


}
