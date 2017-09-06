import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestsComponent } from './interests/interests.component';
import { InterestsRoutingModule } from '../interests/interests-routing.module';

@NgModule({
  imports: [
    CommonModule,
    InterestsRoutingModule
  ],
  declarations: [InterestsComponent]
})
export class InterestsModule { }
