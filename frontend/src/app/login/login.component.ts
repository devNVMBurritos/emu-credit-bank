import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../_services/google-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user!: gapi.auth2.GoogleUser;

  constructor( private googleAuthSercie: GoogleAuthService, private ref: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.googleAuthSercie.observable().subscribe( user => {
      console.log(user);
      this.user = user;
      this.ref.detectChanges();
    });
  }

  SingIn () {
    this.googleAuthSercie.SingIn();
  }

  SingOut () {
    this.googleAuthSercie.SingOut();
  }

} 
