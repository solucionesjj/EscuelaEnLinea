import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  title = '.:: EscualeOnLine ::.';

  menuItems: any = {};
  idUser: number = 0;

  user: any = {};
  // TODO aplicar control del menú para que no todos puedan ver todos los menús
  // TODO los padres ingresan a ver las notas de sus hijos, con promedios y puesto
  constructor(private authService: AuthService, private router: Router, private userService:UserService) {
    this.user = this.userService.getLoggedUserInformation();
    this.idUser = this.user.id;
  }

  ngOnInit() {
  }

  signOut(): void {
    this.authService.signOut(true);
    this.goToLanding();
  }

  goToLanding() {
    this.router.navigate(['landingpage']);
  }
}
