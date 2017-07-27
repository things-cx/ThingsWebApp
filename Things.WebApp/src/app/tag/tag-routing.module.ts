import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagComponent } from 'app/tag/tag/tag.component';
import { Navigation } from 'app/layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':label', component: TagComponent, data: { title: 'Tag', nav: Navigation.Primary } }
        ])
    ],
    exports: [RouterModule]
})
export class TagRoutingModule { }
