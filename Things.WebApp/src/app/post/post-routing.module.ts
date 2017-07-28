import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostComponent } from 'app/post/post/post.component';
import { UserPostsComponent } from 'app/post/user-posts/user-posts.component';
import { PostLikesComponent } from 'app/post/post-likes/post-likes.component';
import { UserPostsLikedComponent } from 'app/post/user-posts-liked/user-posts-liked.component';
import { Navigation } from 'app/layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'likes/user/:id', component: UserPostsLikedComponent, data: { title: 'User post likes', nav: Navigation.Primary } },
            { path: 'likes/:id', component: PostLikesComponent, data: { title: 'Post likes', nav: Navigation.Back } },
            { path: 'user/:id', component: UserPostsComponent, data: { title: 'User posts', nav: Navigation.Back, backRouterPath: '/' } },
            // TODO: route is confusing but can't think of something else
            { path: 'post/:uid', component: PostComponent, data: { title: 'Post', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class PostRoutingModule { }
