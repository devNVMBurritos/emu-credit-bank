import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { CostService } from '../_services/cost.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public Balance: number = 0;
  public CreditorList: {user: User, debt: number}[] = [];
  public DebitorList: {user: User, debt: number}[] = [];

  constructor(
    private costService: CostService,
    private authService: AuthenticationService
  ) { 
    costService.GetBalance(authService.CurrentUser().loginToken || '')
      .subscribe( balance => {
        this.Balance = balance
      });
    costService.GetDebtorsAndCreditors(this.authService.CurrentUser().loginToken || '')
      .subscribe( 
        debtorList => {
          console.log(debtorList);
          Object.values(debtorList).forEach((debtor: { user: any; debt: number; }) => {

            if (debtor.debt < 0) {
              debtor.debt = debtor.debt * -1;
              this.CreditorList.push(debtor);
            } else {
              this.DebitorList.push(debtor);
            }
          });
          console.log(this.CreditorList, this.DebitorList);
        },
        err => {
          console.log(err)
        }
    );
  }

  ngOnInit(): void {
  }

}
