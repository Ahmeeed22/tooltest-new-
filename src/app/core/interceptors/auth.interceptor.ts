import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
    console.log('auth');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const newRequest= request.clone({
      headers : request.headers.append("Authorization", 'Bearer '+'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODgyMzQzZDQzYjc1NjlkNDBlMzFlYTIyZjE1ZWU2NDRkNzVkYzZlOTM4OTQ1MTc4NzU5NGNiY2VmZmRiMzdhNjQxODQzYzI2ODc1ODA4ZjkiLCJpYXQiOjE2Nzc2MDgwNjcuMjc1NjY0LCJuYmYiOjE2Nzc2MDgwNjcuMjc1NjY4LCJleHAiOjE3MDkxNDQwNjcuMjczMzYsInN1YiI6IjgiLCJzY29wZXMiOltdfQ.Vq6EKuceqahHeZcZY1svJp68MkZs1vNcsW-ecQ459_4ljW7Z0m50xXeFQwNuGCRcd96x6faVbEVpzLdBu_ZmBFukDlhK1oOAmn_EQHPxw8rNn0sj9HWLPvmS7KiGSlbg-TAMv7JkAxpYFzcRBcFSAjtCtjuUrrtlaNMAJoPVoX4TyJVJ-CZ6TU6Ozu_wIk_jbUOr0pUvtE_KqQfsCslhI6Hcw9eShAv8jeWg62r5ZQGJJncJdfqeKfjbLAQ1J65hTP3yFzNxFiaRx2LoXRXPfnFUVk5epCTAxKKC1tYrThWK7MM4w8xCi__vXOe2JtyVpnJb5uVeXsvmRKRqHm3F5Xmcrz0zCZBhwFdh05yHBOGe8sx5SR5VBG2iWn_cH71ASBIeimZu_D_4YUvJjc3PrhoxiYpXbaM_unXT2ULxPfvlZleQOejqkSCViwUexpFU04PsW5HdAt2wyWC-IwMcEQS637IxRuC1EhAKGwp-Plw5Rjnqw7XVbBXHEhpavIn3Eda-HPtgAOgT1f5jYRyYNv1Y2IRYrEaCaTjql6ou73UZx6qSYLctRMm_3PMXcMNZKfuRMuBqF-w3ivwuic0xtnxC8a_XkoclVJ_zV3g4lcJUKzW_eMo7IfewIAOKR1wn6Ps8Mhv-UuM4eJXqh4hzl5RO4Q9L41Qb8KxLO0fGXME')
    })
    
    return next.handle(newRequest);
  }
}
 