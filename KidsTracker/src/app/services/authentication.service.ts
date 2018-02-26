import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  private loginUrl = environment.loginUserUrl;
  private updateUserUrl = environment.updateUserUrl;
  private getUserUrl = environment.getUserUrl;
  private createUserUrl = environment.createUserUrl;
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

  updateUser(updatedUser) {
    return this.http.put(this.updateUserUrl, { user: updatedUser }).map((res: Response) => res.json());
  }

  getUserById(userId) {
    return this.http.get(this.getUserUrl + userId).map((res: Response) => res.json());
  }

  createUser(newUser) {
    return this.http.post(this.createUserUrl, { person: newUser }).map((res: Response) => res.json());
  }

}
