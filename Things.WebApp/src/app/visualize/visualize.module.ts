import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { VisualizeRoutingModule } from '../visualize/visualize-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VisualizeRoutingModule
  ],
  declarations: [VisualizerComponent]
})
export class VisualizeModule { }
