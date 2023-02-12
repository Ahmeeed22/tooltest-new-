import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor (private _authService: AuthService, private _router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this._authService.signedin$.pipe(
        skipWhile((val)=> val === null),
        take(1),
        tap((authenticated)=> {
          if(!authenticated) {
            this._router.navigate(['/'])
          }
        })
      )
  }
}
