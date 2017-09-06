import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback/feedback.component';
import { MdButtonModule, MdCardModule, MdInputModule, MdProgressSpinnerModule } from '@angular/material';
import { FeedbackRoutingModule } from '../feedback/feedback-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdProgressSpinnerModule
  ],
  declarations: [
    FeedbackComponent
  ]
})
export class FeedbackModule { }
