import { Component, OnInit } from '@angular/core';
import { NgOneTapService } from 'ng-google-one-tap';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private onetap: NgOneTapService, private authService: AuthenticationService ) { }

  ngOnInit(): void {
    this.onetap.tapInitialize();
    this.onetap.oneTapCredentialResponse.subscribe( res => {
      this.authService.OneTapSingIn(res.credential);
    });
  }

} 
