import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './shared/auth.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
      { path: '', loadChildren: './search/search.module#SearchModule' },
      // Chrome extension routing workaround
      { path: 'index.extension.html', pathMatch: 'full', redirectTo: '' },
      // TODO: add updates consumtion page back in
      // { path: 'home', loadChildren: './feed/feed.module#FeedModule' },
      { path: 'post', loadChildren: './post/post.module#PostModule' },
      { path: 'thing', loadChildren: './thing/thing.module#ThingModule' },
      { path: 'create', loadChildren: './create-thing/create-thing.module#CreateThingModule' },
      { path: 'create-post', loadChildren: './create-post/create-post.module#CreatePostModule', canActivate: [AuthService] },
      { path: 'create-user', loadChildren: './create-user-thing/create-user-thing.module#CreateUserThingModule' },
      { path: 'edit', loadChildren: './edit-thing/edit-thing.module#EditThingModule' },
      { path: 'tag', loadChildren: './tag/tag.module#TagModule' },
      { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialModule' },
      { path: 'interests', loadChildren: './interests/interests.module#InterestsModule' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'likes', loadChildren: './likes/likes.module#LikesModule' },
      { path: 'followers', loadChildren: './followers/followers.module#FollowersModule' },
      { path: 'authorize', loadChildren: './authorize/authorize.module#AuthorizeModule' },
      { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule' },
      { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
      { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackModule' },
      { path: 'official-posters', loadChildren: './official-posters/official-posters.module#OfficialPostersModule' },
      { path: 'sponsors', loadChildren: './sponsors/sponsors.module#SponsorsModule' },
      { path: 'newsletter', loadChildren: './newsletter/newsletter.module#NewsletterModule' },
      { path: 'activity', loadChildren: './activity/activity.module#ActivityModule', canActivate: [AuthService] },
      { path: 'launch', loadChildren: './launch/launch.module#LaunchModule' },
      { path: 'verify', loadChildren: './verify/verify.module#VerifyModule', canActivate: [AuthService] },
      { path: 'discover', pathMatch: 'full', redirectTo: '' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
