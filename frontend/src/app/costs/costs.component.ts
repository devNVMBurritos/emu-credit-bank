import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
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
  private _costUserList: User[] = [];

  constructor(private userService: UserService, private authService: AuthenticationService) {
    userService.FriendList.subscribe( data => {
      //data's value changes in the middle of subscribe event which is fucking cursed so I decided to fix it like this
      const userEmail = authService.CurrentUser().email;
      const tempList: User[] = [];

        data.forEach( element => {
          tempList.push(element);
        });

      if (tempList.findIndex(x => x.email == userEmail) == -1) {
        tempList.push(authService.CurrentUser());
      }

      this.FriendListPlusYou = tempList;
    });
  }

  public OnCheckboxChange(e: any, user: User) {
    if (e.target.checked) {
      this._costUserList.push(user);
    } else {
      const index = this._costUserList.indexOf(user, 0);
      if (index > -1) {
        this._costUserList.splice(index, 1);
      }
    }
    console.log(this._costUserList);
  }

  public CreateCosts() {
    
  }

  ngOnInit(): void {
  }

}
