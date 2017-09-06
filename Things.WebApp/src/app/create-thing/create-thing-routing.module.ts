import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateThingComponent } from './create-thing/create-thing.component';
import { CreatePublicThingComponent } from '../create-thing/create-public-thing/create-public-thing.component';
import { AddShortcutComponent } from '../create-thing/add-shortcut/add-shortcut.component';
import { Navigation } from '../layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'public', component: CreatePublicThingComponent, data: { title: 'Create anonymous Thing', nav: Navigation.Back } },
            { path: 'public/:id', component: CreatePublicThingComponent, data: { title: 'Create anonymous Thing', nav: Navigation.Back } },
            { path: ':id', component: CreateThingComponent, data: { title: 'Create Thing', nav: Navigation.Back } },
            { path: 'shortcut/:id', component: AddShortcutComponent, data: { title: 'Create shortcut Thing', nav: Navigation.Back } },
        ])
    ],
    exports: [RouterModule]
})
export class CreateThingRoutingModule { }
