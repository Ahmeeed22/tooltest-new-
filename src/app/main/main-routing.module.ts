import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { StepperComponent } from './stepper/stepper.component';
import { Stepper2Component } from './stepper2/stepper2.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {path: '', component: Stepper2Component},
      {path: 'profile', component: ProfileComponent},
      {path : 'test' , component : StepperComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
