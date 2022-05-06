import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { CostService } from '../_services/cost.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent implements OnInit {
  public FriendListPlusYou: User[] = []
  private _costUserList: User[] = [];
  public FormGroup: FormGroup;
  public UnsubmittedCostList: {
     _id: string, payedFor: User[],
      payedBy: User, cost: number
    }[] = [];

  public InProcess: boolean = false;
  public ErrorMessage!: string;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private costService: CostService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.FormGroup = formBuilder.group({
      payedBy: ['', [ Validators.required]],
      cost: ['', [Validators.required, Validators.min(0)]]
    });

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

    costService.GetUnconfirmedCosts(authService.CurrentUser().loginToken || '')
      .subscribe( costs => {
        this.UnsubmittedCostList = costs;
      })
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
  }

  public CreateCosts() {
    if (this.FormGroup.controls.payedBy.valid && this.FormGroup.controls.payedBy.valid) {
      this.InProcess = true;

      this.costService.CreateCost(
        this._costUserList, 
        this.FormGroup.controls.payedBy.value, 
        this.FormGroup.controls.cost.value,
        this.authService.CurrentUser().loginToken || ''
        ).subscribe( 
          response => {
            this.InProcess = false;
          },
          error => {
            console.log('err', error);
          }
      ); 
    } else this.ErrorMessage = 'Invalid Input!';
  }
  public ConfirmCost(costId: string) {
    this.costService.ConfirmCost(this.authService.CurrentUser().loginToken || '', costId)
      .subscribe( response => {
        console.log(response);
      },
      err => {
        console.log(err);
      })
  }

  ngOnInit(): void {
  }

}
