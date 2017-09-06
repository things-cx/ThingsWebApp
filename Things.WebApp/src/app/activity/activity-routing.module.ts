import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from '../layout/navigation/navigation.component';
import { PostsActivityComponent } from '../activity/posts-activity/posts-activity.component';
import { ActivityListComponent } from '../activity/activity-list/activity-list.component';
import { ThingsActivityComponent } from '../activity/things-activity/things-activity.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ActivityListComponent, data: { title: 'User activity', nav: Navigation.Primary } },
            { path: 'posts/:id', component: PostsActivityComponent, data: { title: 'Posts activity', nav: Navigation.Back } },
            { path: 'things/:id', component: ThingsActivityComponent, data: { title: 'Things activity', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class ActivityRoutingModule { }
