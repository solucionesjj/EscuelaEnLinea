import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiclientService {
  public baseUrl: string;

  constructor(public http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  async Get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}${url}`).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  async Post(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}${url}`, body).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  async Put(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.baseUrl}${url}`, body).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  async Delete(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.baseUrl}${url}`).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  /*



  async Token(user: string, pass: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.baseUrl}ApiAuth/Login`,
          { email: user, password: pass },
          httpOptions
        )
        .subscribe(
          (data: any) => {
            console.log("Token Received : ", data);
            this.token = data.token;
            localStorage.userToken = data.token;
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }
  */
}
