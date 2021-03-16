import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ComicsService } from 'src/app/services/comics.service';
import { IComics } from 'src/models/comic.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  comics: IComics[] = [];
  icomicsSubscription!: Subscription;
  searchForm!: FormGroup;

  

  constructor(private formBuilder: FormBuilder, private comicsService: ComicsService, private router: Router) { }

  ngOnInit() {
     this.initForm();
  //   // this.icomicsSubscription = this.comicsService.comicsSubject.subscribe(
  //   //   (comics: IComics[]) => {
  //   //     this.comics = comics;
  //   //   }
  //   // );
  //   // this.comicsService.emitComics();
 }

  initForm() {
    this.searchForm = this.formBuilder.group({
    searchText: ''
   });
 }

  onSubmitForm() {
    const searchValue = this.searchForm.value.searchText;
    this.comicsService.getSearchComics(searchValue).subscribe((book: IComics[]) => {
      this.router.navigate(['/liste', { searchText: searchValue}]);
      this.comics = book;})
  //   comicsRef.where("titre", '==', searchValue)
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((_doc) => {
  //        console.log(_doc.id, "=>", _doc.data());
  //         /*if(doc){
  //           var result: Array<any> = [];
  //           this.comics.push(doc as any);
  //           result = this.comics;
  //           console.log(result)
  //         }*/
  //         }
  //         );
  //     })
    
  //   console.log(searchValue);
    } 
}
 




