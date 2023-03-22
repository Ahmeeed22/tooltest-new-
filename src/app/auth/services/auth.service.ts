import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router: Router) { }


  getTreeData(data?:any):Observable<any>{
    return this.http.post('http://test.toollogic.casesfly.ai/api/login',{ email:"fortec.summy@gmail.com",
    password:"123456"})
  }

  addwizard(data:any):Observable<any>{ 
    return this.http.post('http://test.toollogic.casesfly.ai/api/TestCaseTool/add-wizard',data)
  }

  dealingAi(data:any):Observable<any>{
    return this.http.post('http://test.toollogic.casesfly.ai/api/TestCaseTool/dealing-with-ai',data)
  }

  updateUser(data:any):Observable<any>{
    return this.http.post('http://test.toollogic.casesfly.ai/api/TestCaseTool/update-user',data)
  }
}
