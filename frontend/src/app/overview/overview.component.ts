import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { CostService } from '../_services/cost.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public Balance: number = 0;

  constructor(
    private costService: CostService,
    private authService: AuthenticationService
  ) { 
    costService.GetBalance(authService.CurrentUser().loginToken || '')
      .subscribe( balance => {
        this.Balance = balance
      });
  }

  ngOnInit(): void {
  }

}
