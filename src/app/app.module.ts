import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/pages/map/map.component';
import { FuntionComponent } from './components/pages/funtion/funtion.component';
import { CellComponent } from './components/cell/cell.component';
import { FormsModule } from '@angular/forms';
import { Function3vComponent } from './components/pages/function3v/function3v.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MapComponent,
    FuntionComponent,
    CellComponent,
    Function3vComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
