import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {LocalStorageService} from "../../services/localStorage.service";
// import { AuthService } from '../../services/auth.service';
// import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginFormGroup:FormGroup =  this.formBuilder.group({
    email: ['',Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
    password: ['', Validators.required]
  });
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }







  onSubmit() {
    this.isSubmitted = true
    if (this.loginFormGroup.invalid) return;
    this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(data => {
      console.log(data)
      this.authError = false
      this.localstorageService.setToken(data.token)
      this.router.navigate(['/'])
    }, error => {
      this.authError = true
      if(error.status !== 400){
        this.authMessage = "Please try again later"
      }
    })
  }
}
