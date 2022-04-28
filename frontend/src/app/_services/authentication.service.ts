import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _user = new BehaviorSubject<User>(new User('','',''));
  private _logedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    const userString = JSON.parse((localStorage.getItem('user') || '{}'));
    console.log(userString);
    if (userString.loginToken) {
      this._user.next(userString);
      this._logedIn = true;
    }
  }

  public OneTapSingIn(idToken: string) {
    this.http.post<User>(
      environment.APIURI + '/user/login',
      null,
      { headers: {"X-Goog-IAP-JWT-Assertion": idToken}}
    ).subscribe( user => {
      localStorage.setItem('user', JSON.stringify(user))
      this._user.next(user);
      this._logedIn = true;
      this.router.navigate(['overview']);
    })
  }

  public SingOut() {
    console.log('singed out');
    localStorage.removeItem('user');
    this._logedIn = false;
  }

  public ObservableUser(): Observable<User> {
    return this._user.asObservable();
  }

  public CurrentUser(): User {
    return this._user.value;
  }

  public IsAuthenticated(): boolean {
    return this._logedIn;
  }
}
