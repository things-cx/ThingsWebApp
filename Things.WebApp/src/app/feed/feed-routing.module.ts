import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from 'app/layout/navigation/navigation.component';
import { FeedComponent } from 'app/feed/feed/feed.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: FeedComponent, data: { title: 'Home', nav: Navigation.Primary } },
        ])
    ],
    exports: [RouterModule]
})
export class FeedRoutingModule { }
