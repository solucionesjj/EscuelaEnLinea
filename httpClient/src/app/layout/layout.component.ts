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
  user: any = {};
  constructor(private authService: AuthService, private router: Router) {
  }

ngOnInit () {
  this.user = JSON.parse(localStorage.getItem('userInfo'));
}

  signOut(): void {
    this.authService.signOut(true);
    this.goToLanding();
  }

  goToLanding() {
    this.router.navigate(['landingpage']);
  }
}
