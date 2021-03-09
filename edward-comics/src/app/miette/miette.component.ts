import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miette',
  templateUrl: './miette.component.html',
  styleUrls: ['./miette.component.css']
})
export class MietteComponent implements OnInit {

  titrePage: string = "liste article";

  constructor() { }

  ngOnInit(): void {
  }

}
