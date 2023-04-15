import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router: Router) { }
  public userName=new BehaviorSubject<any>(null) ;

  getTreeData(data?:any):Observable<any>{
    return this.http.post('https://test.toollogic.casesfly.ai/api/decrypt-user',data)
  }

  addwizard(data:any):Observable<any>{ 
    return this.http.post('https://test.toollogic.casesfly.ai/api/TestCaseTool/add-wizard',data)
  }

  dealingAi(data:any):Observable<any>{
    return this.http.post('https://test.toollogic.casesfly.ai/api/TestCaseTool/dealing-with-ai',data)
  }

  updateUser(data:any):Observable<any>{
    return this.http.post('https://test.toollogic.casesfly.ai/api/TestCaseTool/update-user',data)
  }


  // recieveCookie():Observable<any>{
  //   return this.http.get('https://test.toollogic.casesfly.ai/send_cookie_to_front',{
  //     withCredentials: true,
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'origin': 'https://toollogic.casesfly.ai/'
  //     })
  //   })
  // }
}
