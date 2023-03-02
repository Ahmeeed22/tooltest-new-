import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { Stepper2Component } from './stepper2/stepper2.component';

const routes: Routes = [
  {
    path : '',
    redirectTo:'/profile',
    pathMatch : 'full'
  },
  {
    path: 'profile',
    component:ProfileComponent
  },
  {
    path: 'ai',
    component:Stepper2Component
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
