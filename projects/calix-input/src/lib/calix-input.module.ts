import { NgModule } from '@angular/core';
import { CalixInputComponent } from './calix-input.component';
import { RequiredMarkerDirective } from './directives/require-marker.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    CalixInputComponent,
    RequiredMarkerDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    CalixInputComponent
  ]
})
export class CalixInputModule { }
