import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FollowersComponent } from '../followers/followers/followers.component';
import { Navigation } from '../layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: FollowersComponent, data: { title: 'Followers', nav: Navigation.Back } },
            { path: 'user/:id', component: FollowersComponent, data: { title: 'User followers', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class FollowersRoutingModule { }
