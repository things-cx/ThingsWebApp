import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreatePostComponent } from 'app/create-post/create-post/create-post.component';
import { Navigation } from 'app/layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CreatePostComponent, data: { title: 'Create post', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class CreatePostRoutingModule { }
