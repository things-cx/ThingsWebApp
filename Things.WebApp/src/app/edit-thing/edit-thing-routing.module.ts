import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagsComponent } from 'app/edit-thing/tags/tags.component';
import { DescriptionComponent } from 'app/edit-thing/description/description.component';
import { MediaComponent } from 'app/edit-thing/media/media.component';
import { EditComponent } from 'app/edit-thing/edit/edit.component';
import { DeleteComponent } from 'app/edit-thing/delete/delete.component';
import { Navigation } from 'app/layout/navigation/navigation.component';
import { AmazonComponent } from 'app/edit-thing/amazon/amazon.component';
import { ButtonsComponent } from 'app/edit-thing/buttons/buttons.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: EditComponent, data: { title: 'Thing information', nav: Navigation.Back } },
            { path: 'tags/:id', component: TagsComponent, data: { title: 'Edit tags', nav: Navigation.Back } },
            { path: 'description/:id', component: DescriptionComponent, data: { title: 'Edit description', nav: Navigation.Back } },
            { path: 'media/:id', component: MediaComponent, data: { title: 'Edit media', nav: Navigation.Back } },
            { path: 'delete/:id', component: DeleteComponent, data: { title: 'Delete Thing', nav: Navigation.Back } },
            { path: 'amazon/:id', component: AmazonComponent, data: { title: 'Edit amazon link', nav: Navigation.Back } },
            { path: 'buttons/:id', component: ButtonsComponent, data: { title: 'Thing Buttons', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class EditThingRoutingModule { }
