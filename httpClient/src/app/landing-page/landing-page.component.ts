import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {


  GoogleAuth: any = {};

  constructor(private authService: AuthServiceService, private _router: Router) {

  }

  ngOnInit() {
  }


  logIn() {
    this.authService.logIn();
  }

  logOut() {
    this.authService.logOut();
  }

  getUser() {
    this.authService.getUser();
  }

  goCourse() {
    this._router.navigate(['app/course']);
  }
}
