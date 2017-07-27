import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from 'app/layout/navigation/navigation.component';
import { ActivityComponent } from 'app/activity/activity/activity.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: ActivityComponent, data: { title: 'Activity', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class ActivityRoutingModule { }
