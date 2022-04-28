import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public SearchForUser(username: string, loginToken: string) {
    return this.http.post<User[]>(
      environment.APIURI + '/user/search',
      { username: username },
      { headers: { Authorization: 'Bearer ' + loginToken }}
    )
  }
}
