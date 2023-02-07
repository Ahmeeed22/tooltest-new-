import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
// primeng components
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from "primeng/inputtextarea";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CardModule,
    InputTextareaModule
  ],
  exports:[
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CardModule,
    InputTextareaModule

  ]
})
export class SharedModule { }
