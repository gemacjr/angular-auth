import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  private BASE_URL: string = 'http:/openam';
  private username;
  private password;
  private headers: Headers = new Headers({
    'X-Open-Username': this.username,
    'X-Open-Password': this.password
  });

  constructor(private http: Http){}

  login(user: User): Promise<any> {
    return this.http.post(this.BASE_URL, user, {headers: this.headers }).toPromise();
  }

  ensureAuthenticated(token): Promise<any> {
    let url: string = '';
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

}
