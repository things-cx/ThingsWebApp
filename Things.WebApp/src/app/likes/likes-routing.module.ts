import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LikesComponent } from '../likes/likes/likes.component';
import { Navigation } from '../layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: LikesComponent, data: { title: 'Likes', nav: Navigation.Back } },
            { path: 'user/:id', component: LikesComponent, data: { title: 'User likes', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class LikesRoutingModule { }
