import { Injectable } from '@angular/core';
declare var gapi: any;
declare var $: any;
var context;
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() {
    context = this;

  }

  init() {
    gapi.load('client:auth2', context.initClient);
  }

  logIn() {
    context.GoogleAuth.signIn();
  }

  logOut() {
    if (context.GoogleAuth.isSignedIn.get()) {
      context.GoogleAuth.signOut();
    }
  }
  isAuthenticated() {
    if (context.GoogleAuth.isSignedIn) {
      return context.GoogleAuth.isSignedIn.get();
    } else {
      return false;
    }
  }
  getUser() {
    var user = context.GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/drive.metadata.readonly');
    if (isAuthorized) {
      console.log(user);
      return user;
    } else {
      return {};
    }
  }

  initClient() {
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
    gapi.client.init({
      'apiKey': 'AIzaSyDQMpFkWT3p9gEUZWy-WTp2i8u2d5F5bGo',
      'discoveryDocs': [discoveryUrl],
      'clientId': '910568189242-k4evb88o5r24v6d40egt2kdd6qci3daa.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly'
    }).then(function () {
      context.GoogleAuth = gapi.auth2.getAuthInstance();
      context.GoogleAuth.isSignedIn.listen(context.updateSigninStatus);
      var user = context.GoogleAuth.currentUser.get();
      context.getUser();
    });
  }



}
