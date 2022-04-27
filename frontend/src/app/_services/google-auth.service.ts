import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private auth2!: gapi.auth2.GoogleAuth
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1)

  constructor() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '823707024933-s1forcsoj41oi4vfu71n6cpk6fmi0pvj.apps.googleusercontent.com'
      });
    })
   }

  public SingIn() {
    this.auth2.signIn({

    }).then( user => {
      this.subject.next(user);
    }).catch();
  }

  public SingOut() {
    this.auth2.signOut();
  }

  public observable() : Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }
}
