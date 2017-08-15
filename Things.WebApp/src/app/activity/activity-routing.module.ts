import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from 'app/layout/navigation/navigation.component';
import { ActivityComponent } from 'app/activity/activity/activity.component';
import { ActivityListComponent } from 'app/activity/activity-list/activity-list.component';
import { ThingsActivityComponent } from 'app/activity/things-activity/things-activity.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ActivityListComponent, data: { title: 'User activity', nav: Navigation.Primary } },
            { path: 'posts/:id', component: ActivityComponent, data: { title: 'Posts activity', nav: Navigation.Back } },
            { path: 'things/:id', component: ThingsActivityComponent, data: { title: 'Things activity', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class ActivityRoutingModule { }
