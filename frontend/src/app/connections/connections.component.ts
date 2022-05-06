import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {
  public SelectedUser! : User;
  public Selected = false;
  public UserSearch: FormGroup;
  public users: User[] = [];
  public RequestedList: User[] = [];
  public RequestList: User[] = [];
  public FriendList: User[] = [];


  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.UserSearch = formBuilder.group({
      username: ['', [Validators.required]]
    });
    this.RequestList = userService.RequestList.value;
    this.RequestedList = userService.RequestedList.value;
    this.FriendList = userService.FriendList.value;

    userService.RequestList.subscribe( list => {
      this.RequestList = list;
    })
    userService.FriendList.subscribe( list => {
      this.FriendList = list;
    })
    userService.RequestedList.subscribe( list => {
      this.RequestedList = list
    })
  }
  public User() {
    return this.authService.CurrentUser();
  }

  ngOnInit(): void { }

  public SearchUser() {
    this.userService.SearchForUser(
      this.UserSearch.controls.username.value,
      this.authService.CurrentUser().loginToken || ''
    ).subscribe( users => {
      if (users.length === 1 && this.UserSearch.controls.username.value === users[0].username) {
        this.SelectUser(users[0]);
      } else this.Selected = false;
      this.users = users;
    });
  }

  public SelectUser(user: User) {
    this.Selected = true;
    this.UserSearch.controls.username.setValue(user.username);
    this.SelectedUser = user
  }

  public RequestContact() {
    this.userService.SendRequest(
      this.SelectedUser._id,
      this.authService.CurrentUser().loginToken || ''
    ).subscribe( data =>{ this.userService.GetRequestLists(); });
   }

   public AcceptRequest(user: User) {
    this.userService.SendRequest(
      user._id,
      this.authService.CurrentUser().loginToken || ''
    ).subscribe( data =>{ this.userService.GetRequestLists(); } );
   }
}
