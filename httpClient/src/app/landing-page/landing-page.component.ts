import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  user: any = {};
  loggedIn: boolean;
  autorized: boolean;

  title = '.:: Bienvenidos ::.';

  constructor(private router: Router, private crudService: CrudService, private authSocialService: AuthService) {
  }

  ngOnInit() {
    this.authSocialService.authState.subscribe(
      (user) => {
        this.user = user;
        this.loggedIn = (user != null);
        this.isAutorized();
      }
    );
  }

  signIn(): any {
    localStorage.removeItem('userInfo');
    this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut() {
    localStorage.removeItem('userInfo');
    this.authSocialService.signOut(true);    
  }

  async isAutorized() {
    if (this.user) {
      this.crudService.model = 'User';
      const searchCriteria = `{"where":{"email":"` + this.user.email + `"}}`;
      const result = await this.crudService.getSearch(searchCriteria);
      if (result.result) {
        if (result.data.length > 0) {
          this.autorized = true;
          let userInfo: any = {};
          if (this.user) {
            userInfo = {
              name: this.user.name,
              photoUrl: this.user.photoUrl,
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              email: this.user.email,
              valid: (new Date).toLocaleDateString()
            };
            userInfo.groups = await this.getUsertGroups(result.data[0].id);
          }
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
          this.autorized = false;
        }
      } else {
        this.autorized = false;
      }
    } else {
      localStorage.removeItem('userInfo');
    }
  }

  async getUsertGroups(idUser: string) {
    let userGroupsObject: any = [];
    this.crudService.model = 'Group';
    const sqlQuery = `select g.group, ug.idGroup from UserGroups as ug inner join Groups as g on ug.idGroup = g.id where ug.idUser = ` + idUser;
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      result.data.forEach(item => {
        userGroupsObject.push({ idGroup: item.idGroup, group: item.group });
      });
    }
    if (userGroupsObject.length === 0) {
      userGroupsObject.push({ idGroup: 0, group: 'Sin grupos' });
    }
    return userGroupsObject;
  }

  goToApp() {
    this.router.navigate(['app']);
  }
}
