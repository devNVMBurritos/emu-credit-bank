import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup
  public loading  = false;
  public error!: string;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { 
    this.form = formBuilder.group({
      email: ['', [ Validators.email, Validators.required ]],
      username: ['', [Validators.minLength(3), Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required, Validators.pattern('.*[0-9].*'), Validators.pattern('.*[a-z].*'), Validators.pattern('.*[A-Z].*')]]
    });
  }

  ngOnInit(): void {
  }

  public Register() {
    this.loading = true;
    const controls = this.form.controls;
    this.authService.Register(
      controls.username.value,
      controls.email.value,
      controls.password.value
    ).subscribe( 
      (response) => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      err => {
        this.loading = false;
        if (typeof err.error === 'string')
          this.error = err.error;
        else 
          this.error = err.message;
      }
    );
  }

}
