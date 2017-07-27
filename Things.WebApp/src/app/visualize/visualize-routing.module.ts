import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VisualizerComponent } from 'app/visualize/visualizer/visualizer.component';
import { Navigation } from 'app/layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: VisualizerComponent, data: { title: 'Visualizer', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class VisualizeRoutingModule { }
