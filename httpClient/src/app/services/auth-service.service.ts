import { Injectable, OnChanges } from '@angular/core';
import { SocialUser, AuthService } from 'angularx-social-login';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  user: SocialUser;
  loggedIn: boolean;
  autorized: boolean;

  constructor(private authService: AuthService, private crudService: CrudService) {
    this.loggedIn = false;
    this.autorized = false;
  }

  authState() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (user != null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  async isAutorized() {
    this.crudService.model = 'User';
    const searchCriteria = `{"where": {"email":"` + this.user.email + `"}}`;
    const result = await this.crudService.getSearch(searchCriteria);
    if (result.data) {
      this.autorized = true;
    } else {
      this.autorized = false;
    }
  }

  isAuthenticated() {
    this.authState();
    if (this.loggedIn) {
      this.isAutorized();
      if (this.autorized) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
