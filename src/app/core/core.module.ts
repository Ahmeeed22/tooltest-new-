import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), 
  ],
  providers: [
    // {
    //   provide :HTTP_INTERCEPTORS,
    //   useClass :AuthInterceptor,
    //   multi :true
    // },
    // {
    //   provide :HTTP_INTERCEPTORS,
    //   useClass :LoaderInterceptor,
    //   multi :true
    // },
    {
      provide :HTTP_INTERCEPTORS,
      useClass :ErrorInterceptor,
      multi :true
    }
  ]
})
export class CoreModule { }
