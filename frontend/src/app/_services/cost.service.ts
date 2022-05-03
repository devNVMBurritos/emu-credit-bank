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
      environment.APIURI + '/cost/balance/get',
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

  public GetUnconfirmedCosts(loginToken: string) {
    return this.http.post<any>(
      environment.APIURI + '/cost/create', 
      { },
      { headers: { Authorization: 'Bearer ' + loginToken}} )
  }
}
