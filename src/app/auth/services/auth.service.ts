import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url= "https://crud-dcd8.onrender.com";
  signedin$= new BehaviorSubject(false);
  constructor(private http: HttpClient, private _router: Router) { }

  login(user: any) {
    return this.http.post<{userId: string; token: string}>(`${this.url}/auth/login`, user).pipe(
      tap((res)=> {
        this.signedin$.next(true)
        localStorage.setItem('token', res.token);
        this._router.navigate(['/main/profile'])
      })
    )
  }

  checkAuth() {
    let token= localStorage.getItem('token');

    if(token) {
      this.signedin$.next(true);
    }else {
      this.signedin$.next(false)
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.signedin$.next(false)
    this._router.navigateByUrl('/login')
  }
}
