import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        LoginComponent,
        ProfileComponent,
        MainComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
    ]
})
export class AuthModule { }
