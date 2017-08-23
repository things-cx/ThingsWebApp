import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThingButtonsComponent } from './thing-buttons/thing-buttons.component';
import { MdIconModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [
    ThingButtonsComponent
  ],
  exports: [
    ThingButtonsComponent
  ]
})
export class ThingButtonsModule { }
