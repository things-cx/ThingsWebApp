import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThingChildrenComponent } from './thing-children/thing-children.component';
import { ThingDetailsComponent } from './thing-details/thing-details.component';
import { Navigation } from '../layout/navigation/navigation.component';
import { DescriptionComponent } from '../thing/description/description.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: ThingDetailsComponent, data: { title: 'Thing' } },
            { path: 'description/:id', component: DescriptionComponent, data: { title: 'Description', nav: Navigation.Back } },
            { path: 'description/:id/:version', component: DescriptionComponent, data: { title: 'Description', nav: Navigation.Back } },
            { path: ':id/:version', component: ThingDetailsComponent, data: { title: 'Thing' } },
        ])
    ],
    exports: [RouterModule]
})
export class ThingRoutingModule { }
