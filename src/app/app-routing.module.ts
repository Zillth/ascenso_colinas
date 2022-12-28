import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Function3vComponent } from './components/pages/function3v/function3v.component';
import { FuntionComponent } from './components/pages/funtion/funtion.component';
import { MapComponent } from './components/pages/map/map.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'function', component: FuntionComponent },
  { path: 'function2', component: Function3vComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
