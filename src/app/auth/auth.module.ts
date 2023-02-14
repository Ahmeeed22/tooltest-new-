import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';


@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        CoreModule
    ]
})
export class AuthModule { }
