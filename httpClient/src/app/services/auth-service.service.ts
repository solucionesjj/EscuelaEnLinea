import { Injectable, OnChanges } from '@angular/core';
import { SocialUser, AuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthService) {
  }

  authState() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        console.log(this.user.email);
        console.log(this.loggedIn);
      } else {
        console.log('authState  autenticación no lograda. ')
      }
    });
  }

  isAuthenticated() {
    this.authState();
    if (this.loggedIn) {
      return true;
    } else {
      return false;
    }
  }
}
