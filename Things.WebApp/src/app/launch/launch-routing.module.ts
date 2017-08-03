import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from 'app/layout/navigation/navigation.component';
import { LaunchComponent } from 'app/launch/launch/launch.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: LaunchComponent, data: { title: 'Launch' } },
        ])
    ],
    exports: [RouterModule]
})
export class LaunchRoutingModule { }
