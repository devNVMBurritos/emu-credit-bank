import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { ContactRequest } from '../_models/request'
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public  RequestList =  new BehaviorSubject<User[]>([]);
  public RequestedList = new BehaviorSubject<User[]>([])
  public FriendList = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.GetRequestLists();
  }
  public GetRequestLists() {
    this.http.post<ContactRequest[]>(
      environment.APIURI + '/user/connection/list',
      {},
      { headers: { Authorization: 'Bearer ' +  this.authService.CurrentUser().loginToken || ''}}
    ).subscribe( contactRequests => {
      if (!contactRequests) {
        return;
      }
      this.RequestList.next([]);
      this.RequestedList.next([]);
      
      contactRequests.forEach( request => {
        if (request.requested._id == this.authService.CurrentUser()._id) {
          if (request.confirmed) {
            let tempList = this.FriendList.value;
            tempList.push(request.requester);
            this.FriendList.next(tempList);

            return;
          }
          let tempList = this.RequestList.value;
          tempList.push(request.requester);
          this.RequestList.next(tempList);
        } 
        if (request.requester._id == this.authService.CurrentUser()._id) {
          if (request.confirmed) {
            let tempList = this.FriendList.value;
            tempList.push(request.requested);
            this.FriendList.next(tempList);

            return;
          }
          let tempList = this.RequestedList.value;
          tempList.push(request.requested);
          this.RequestedList.next(tempList);
        }
        
      });
    });
  }

  public SearchForUser(username: string, loginToken: string) {
    return this.http.post<User[]>(
      environment.APIURI + '/user/search',
      { username: username },
      { headers: { Authorization: 'Bearer ' + loginToken }}
    )
  }

  public SendRequest(requested: string, loginToken: string) {
    return this.http.post<string>(
      environment.APIURI + '/user/connection/request',
      { requested:  requested },
      { headers: { Authorization: 'Bearer ' + loginToken }}
    )
  }
}
