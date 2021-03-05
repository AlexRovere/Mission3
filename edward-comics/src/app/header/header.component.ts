import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: any;

  constructor(private router: Router, private authService: AuthService) {
   
   }

  ngOnInit(): void {
  }

  verifconnec(){
    this.user = this.authService.user;
    if(this.user!=null){
      this.router.navigate(['detail-compte']);
    }else{
      this.router.navigate(['auth/signin']);
    }
  }

}
