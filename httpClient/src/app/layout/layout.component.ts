import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  title = '.:: EscualeOnLine ::.';
  constructor(private authService: AuthService, private router: Router) { }

  goToLanding() {
    this.router.navigate(['landingpage']);
  }

  signOut(): void {
    this.authService.signOut().then((signOutResult) => this.goToLanding());
  }
}
