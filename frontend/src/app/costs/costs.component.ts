import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent implements OnInit {
  public FriendListPlusYou: User[] = []

  constructor(private userService: UserService, private authService: AuthenticationService) {
    this.FriendListPlusYou = userService.FriendList.value;
    if (this.FriendListPlusYou.findIndex(x => x.email == authService.CurrentUser().email) == -1) {
       console.log(this.FriendListPlusYou.findIndex(x => x.email == authService.CurrentUser().email));
      this.FriendListPlusYou.push(authService.CurrentUser()); 
    }
  }

  ngOnInit(): void {
  }

}
