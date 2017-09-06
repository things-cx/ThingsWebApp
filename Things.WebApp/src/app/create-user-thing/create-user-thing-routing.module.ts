import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateUserThingFormComponent } from './create-user-thing-form/create-user-thing-form.component';
import { Navigation } from '../layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CreateUserThingFormComponent, data: { title: 'Create profile', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class CreateUserThingRoutingModule { }
