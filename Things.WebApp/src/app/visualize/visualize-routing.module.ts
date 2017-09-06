import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VisualizerComponent } from '../visualize/visualizer/visualizer.component';
import { Navigation } from '../layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: VisualizerComponent, data: { title: 'Visualizer', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class VisualizeRoutingModule { }
