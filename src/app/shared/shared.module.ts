import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DropdownModule,
 
  ],
  exports:[
    ButtonModule,
    DropdownModule,
    NavbarComponent

  ]
})
export class SharedModule { }
