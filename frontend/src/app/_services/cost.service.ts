import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class CostService {

  constructor(private http: HttpClient) { }

  public GetBalance(loginToken: string) {
    return this.http.post<number>(
      environment.APIURI + '/cost/calculations/user-balance-cost-calculation',
      {},
      { headers: { Authorization: 'Bearer ' + loginToken}} 
    );
  }

  public CreateCost(payedFor: User[], payedBy: User, cost: number, loginToken: string) {
    return this.http.post<string>(
      environment.APIURI + '/cost/create', 
      { 
        payedFor: payedFor,
        payedBy: payedBy,
        cost: cost
      },
      { headers: { Authorization: 'Bearer ' + loginToken}} )
  }

  public GetDebtorsAndCreditors(loginToken: string) {
    return this.http.post<[{ user: User, debt: number}]>(
      environment.APIURI + '/cost/debt/get-credit-list', 
      { },
      { headers: { Authorization: 'Bearer ' + loginToken}} )
  }

  public GetUnconfirmedCosts(loginToken: string) {
    return this.http.post<{ _id: string, payedFor: User[], payedBy: User, cost: number}[]>(
      environment.APIURI + '/cost/lists/unconfirmed-cost-list',
      {},
      { headers: { Authorization: 'Bearer ' + loginToken}}
    );
  }

  public ConfirmCost(loginToken: string, costId: string) {
    return this.http.post<string>(
      environment.APIURI + '/cost/confirm',
      { costId: costId },
      { headers: { Authorization: 'Bearer ' + loginToken}}
    )
  }
}
