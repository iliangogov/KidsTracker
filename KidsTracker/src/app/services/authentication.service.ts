import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  private loginUrl = environment.loginUserUrl;
  constructor(private http: Http) { }

  login(userToLogin): Observable<any> {
    return this.http.post(this.loginUrl, { person: userToLogin }).map((res: Response) => {
      const jsonRespond = res.json();
      if (jsonRespond.person && jsonRespond.token) {
        localStorage.setItem('loggedUser', JSON.stringify(jsonRespond));
      }
      return res.json();
    });
  }

  logout(): void {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    if (user) {
      localStorage.removeItem('loggedUser');
    }
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    return user ? true : false;
  }

  getLoggedUser(): any {
    const storageData = JSON.parse(localStorage.getItem('loggedUser'));
    return storageData.person;
  }

}
