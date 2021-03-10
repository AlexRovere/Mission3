import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: any;
  userSubscription!: Subscription;


  constructor(private authService: AuthService) {
   
   }

  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject.subscribe(
      (user: any) => {
        this.user = user;
      }
    );
    this.authService.emitUser();
  }

}
