import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Stepper2Component } from './stepper2/stepper2.component';

const routes: Routes = [
  {
    path: '', component: Stepper2Component
  },
  {path: 'login', loadChildren: ()=> import('./auth/auth.module').then(m=> m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
