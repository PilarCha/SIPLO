import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapsComponent} from './maps/maps.component'
import {AppComponent} from './app.component'

const routes: Routes = [
  {
    path: '',
    children: [],
    component:AppComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
