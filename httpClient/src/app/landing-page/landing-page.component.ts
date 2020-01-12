import { Component, OnInit, OnChanges } from '@angular/core';
import { GoogleLoginProvider, AuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  title = '.:: Bienvenidos ::.';

  constructor(private router: Router, private authService: AuthService) {
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((GoogleLoginProviderResult) => this.goToApp());
  }

  goToApp() {
    this.router.navigate(['app']);
  }
}
