import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  //private BASE_URL: string = 'http://localhost:8080/openam/json/realms/ofipublic/authenticate';
  private BASE_URL: string = 'http://authamdev.ofi.com:80/openam/json/realms/ofipublic/authenticate';
  

  constructor(private http: Http){}

  login(user: User): Promise<any> {
    const username = user.username
    const password = user.password
    const header: Headers = new Headers({
      
      'X-OpenAM-Username': username,
      'X-OpenAM-Password': password
    })
    return this.http.post(this.BASE_URL, {headers: header }).toPromise();
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
