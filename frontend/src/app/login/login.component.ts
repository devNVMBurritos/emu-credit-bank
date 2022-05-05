import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOneTapService } from 'ng-google-one-tap';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public LoginForm: FormGroup

  constructor(
    private onetap: NgOneTapService,
    private authService: AuthenticationService,
    public router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.LoginForm = formBuilder.group({
      email: ['', [ Validators.required ]],
      password: ['', [ Validators.required ]]
    })
  }

  ngOnInit(): void {
    this.onetap.tapInitialize();
    this.onetap.oneTapCredentialResponse.subscribe( res => {
      this.authService.OneTapSingIn(res.credential);
    });
  }
  
  public SingIn() {
    this.authService.SingIn(
      this.LoginForm.controls.email.value,
      this.LoginForm.controls.password.value
    );
  }

} 
