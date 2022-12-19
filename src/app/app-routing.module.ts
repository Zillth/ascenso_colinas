import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuntionComponent } from './components/pages/funtion/funtion.component';
import { MapComponent } from './components/pages/map/map.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'function', component: FuntionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
