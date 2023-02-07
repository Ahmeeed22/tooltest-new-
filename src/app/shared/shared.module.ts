import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
<<<<<<< HEAD
// primeng components
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from "primeng/inputtextarea";
=======
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

>>>>>>> aa4385f2596b37774ec6afcd564cbe83d912f0fb

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CardModule,
    InputTextareaModule
  ],
  exports:[
    ButtonModule,
    DropdownModule,
<<<<<<< HEAD
    InputTextModule,
    CardModule,
    InputTextareaModule
=======
    NavbarComponent
>>>>>>> aa4385f2596b37774ec6afcd564cbe83d912f0fb

  ]
})
export class SharedModule { }
