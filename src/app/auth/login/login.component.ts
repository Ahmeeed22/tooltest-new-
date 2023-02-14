import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private _authService: AuthService , private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      console.log("invalid");
      return
    }

    const Login= {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      role: "admin"
    }

    this._authService.login(Login).subscribe(()=> {
      this.router.navigate(['/main/profile'])
    })
  
  }

  get formData() {
    return this.loginForm.controls
  }

}
