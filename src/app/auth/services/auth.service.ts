import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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
  getTreeData(data?:any):Observable<any>{
    return this.http.post('http://test.toollogic.casesfly.ai/api/login',{ email:"fortec.summy@gmail.com",
    password:"123456"})
  }

  checkAuth() {
    let token= localStorage.getItem('token');

    if(token) {
      this.signedin$.next(true);
    }else {
      this.signedin$.next(false)
    }
  }

  addwizard(data:any):Observable<any>{ 
    return this.http.post('http://test.toollogic.casesfly.ai/api/TestCaseTool/add-wizard',data)
  }

  dealingAi(data:any):Observable<any>{
    return this.http.post('http://test.toollogic.casesfly.ai/api/TestCaseTool/dealing-with-ai',data)
  }
  logout() {
    localStorage.removeItem('token');
    this.signedin$.next(false)
    this._router.navigateByUrl('/login')
  }
}
