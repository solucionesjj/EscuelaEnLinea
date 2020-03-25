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

  menuItems: any = {};

  user: any = {};
  // TODO aplicar control del menú para que no todos puedan ver todos los menús
  // TODO los padres ingresan a ver las notas de sus hijos, con promedios y puesto
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
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
