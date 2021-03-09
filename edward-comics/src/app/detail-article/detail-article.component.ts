import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComics } from 'src/models/comic.model';
import { ComicsService } from '../services/comics.service';


@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {



  comic!: IComics;

  constructor(private route: ActivatedRoute, private router: Router, private comicsService: ComicsService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.comicsService.getSingleComic(id).then(
      (comic: IComics) => {
        this.comic = comic
      }
    );
  }

  onBack() {
    this.router.navigate(['/home']);
  }

}

