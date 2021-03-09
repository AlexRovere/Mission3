import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-validation',
  templateUrl: './modal-validation.component.html',
  styleUrls: ['./modal-validation.component.css']
})
export class ModalValidationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hideModal() {
    const $modal : any = document.querySelector(".modalComponent");
    $modal.classList.replace("modalComponent", "hiddenModal");
  }

  showModal() {
    const $modal : any = document.querySelector(".hiddenModal");
    $modal.classList.replace("hiddenModal", "modalComponent");
  }

}
