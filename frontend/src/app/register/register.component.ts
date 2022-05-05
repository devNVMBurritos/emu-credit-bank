import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { 
    this.form = formBuilder.group({
      email: ['', [ Validators.email, Validators.required ]],
      username: ['', [Validators.minLength(3), Validators.required]],
      password: ['', [Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  public Register() {

  }

}
