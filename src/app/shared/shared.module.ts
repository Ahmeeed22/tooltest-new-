import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import {DragDropModule} from 'primeng/dragdrop';
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { CardModule } from "primeng/card";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from '../material/material.module';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [
    NavbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DropdownModule,
    DragDropModule,
    TooltipModule,
    TableModule,
    ToastModule,
    CardModule,
    MaterialModule
 
  ],
  exports:[
    ButtonModule,
    DropdownModule,
    NavbarComponent,
    DragDropModule,
    TooltipModule,
    TableModule,
    ToastModule,
    CardModule

  ]
})
export class SharedModule { }
