import { Component, OnInit } from '@angular/core';
declare var gapi: any;
declare var $: any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {


  GoogleAuth: any = {};
  SCOPE: string = 'https://www.googleapis.com/auth/drive.metadata.readonly';

  constructor() { }

  ngOnInit() {

  }


  handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
      'apiKey': 'AIzaSyDQMpFkWT3p9gEUZWy-WTp2i8u2d5F5bGo',
      'discoveryDocs': [discoveryUrl],
      'clientId': '910568189242-k4evb88o5r24v6d40egt2kdd6qci3daa.apps.googleusercontent.com',
      'scope': this.SCOPE
    }).then(function () {
      this.GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      this.GoogleAuth.isSignedIn.listen(this.updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      var user = this.GoogleAuth.currentUser.get();
      this.setSigninStatus();

      // Call handleAuthClick function when user clicks on
      //      "Sign In/Authorize" button.
      // const context = this;
      // $('#sign-in-or-out-button').click(function () {
      //   context.handleAuthClick();
      // });
      // $('#revoke-access-button').click(function () {
      //   context.revokeAccess();
      // });
    });
  }

  handleAuthClick() {

    if (this.GoogleAuth.isSignedIn) {
      if (this.GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked 'Sign out' button.
        this.GoogleAuth.signOut();
      } else {
        // User is not signed in. Start Google auth flow.
        this.GoogleAuth.signIn();
      }
    }

  }

  revokeAccess() {
    this.GoogleAuth.disconnect();
  }

  setSigninStatus(isSignedIn) {
    var user = this.GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(this.SCOPE);
    if (isAuthorized) {
      $('#sign-in-or-out-button').html('Sign out');
      $('#revoke-access-button').css('display', 'inline-block');
      $('#auth-status').html('You are currently signed in and have granted ' +
        'access to this app.');
      console.log(user);
      console.log(user.w3.ig);
      console.log(user.w3.ofa);
      console.log(user.w3.wea);
      console.log(user.w3.U3);
      console.log(user.w3.getImageUrl());
      console.log(user.w3.getId());
      $(".userImage").src = user.w3.getImageUrl();

    } else {
      $('#sign-in-or-out-button').html('Sign In/Authorize');
      $('#revoke-access-button').css('display', 'none');
      $('#auth-status').html('You have not authorized this app or you are ' +
        'signed out.');
    }

  }

  updateSigninStatus(isSignedIn) {
    this.setSigninStatus(isSignedIn);
  }

}
