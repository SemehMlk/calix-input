import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalixInputModule, ComparaisonTableComponent } from 'projects/calix-input/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalixInputModule,
    ReactiveFormsModule,
    FormsModule,
    ComparaisonTableComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
