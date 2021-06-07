import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuideComponent } from './components/guide/guide.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Rc232Component } from './components/rc232/rc232.component';
import { T1235Component } from './components/t1235/t1235.component';
import { T1236Component } from './components/t1236/t1236.component';
import { T2081Component } from './components/t2081/t2081.component';
import { T3010Component } from './components/t3010/t3010.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"t3010",component:T3010Component},
  {path:"rc232",component:Rc232Component},
  {path:"t1236",component:T1236Component},
  {path:"t1235",component:T1235Component},
  {path:"t2081",component:T2081Component},
  {path:"guide",component:GuideComponent},
  {path:"home",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
