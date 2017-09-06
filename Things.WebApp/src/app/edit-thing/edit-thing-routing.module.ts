import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagsComponent } from '../edit-thing/tags/tags.component';
import { DescriptionComponent } from '../edit-thing/description/description.component';
import { MediaComponent } from '../edit-thing/media/media.component';
import { EditComponent } from '../edit-thing/edit/edit.component';
import { DeleteComponent } from '../edit-thing/delete/delete.component';
import { Navigation } from '../layout/navigation/navigation.component';
import { AmazonComponent } from '../edit-thing/amazon/amazon.component';
import { ButtonsComponent } from '../edit-thing/buttons/buttons.component';
import { OfficialPostersComponent } from '../edit-thing/official-posters/official-posters.component';
import { SponsorsComponent } from '../edit-thing/sponsors/sponsors.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: EditComponent, data: { title: 'Thing information', nav: Navigation.Back } },
            { path: 'tags/:id', component: TagsComponent, data: { title: 'Edit tags', nav: Navigation.Back } },
            { path: 'description/:id', component: DescriptionComponent, data: { title: 'Edit description', nav: Navigation.Back } },
            { path: 'media/:id', component: MediaComponent, data: { title: 'Edit media', nav: Navigation.Back } },
            { path: 'delete/:id', component: DeleteComponent, data: { title: 'Delete Thing', nav: Navigation.Back } },
            { path: 'amazon/:id', component: AmazonComponent, data: { title: 'Edit amazon link', nav: Navigation.Back } },
            { path: 'buttons/:id', component: ButtonsComponent, data: { title: 'Thing Buttons', nav: Navigation.Back } },
            { path: 'official-posters/:id', component: OfficialPostersComponent, data: { title: 'Thing Official Posters', nav: Navigation.Back } },
            { path: 'sponsors/:id', component: SponsorsComponent, data: { title: 'Thing Sponsors', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class EditThingRoutingModule { }
