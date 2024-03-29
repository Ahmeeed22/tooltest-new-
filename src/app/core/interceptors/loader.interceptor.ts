import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {  finalize} from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private spinnerService: NgxSpinnerService) {
    console.log('loader');
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("show");
    // this.spinnerService.show()
    return next.handle(request).pipe(finalize(() =>{
      //  this.spinnerService.hide()
       console.log("hide");
       
      }))
  }
}
