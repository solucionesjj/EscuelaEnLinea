import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  constructor() {
  }

  isAutorized() {
    let userInfo: any = {};
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const currentDate = (new Date).toLocaleDateString();
    if (userInfo) {
      if (userInfo.valid === currentDate) {
        return true;
      } else {
        localStorage.removeItem('userInfo');
        return false;
      }
    } else {
      return false;
    }
  }
}
