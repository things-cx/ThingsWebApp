import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from 'app/layout/navigation/navigation.component';
import { AvailableSponsorsComponent } from 'app/sponsors/available-sponsors/available-sponsors.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: AvailableSponsorsComponent, data: { title: 'Available Sponsors', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class SponsorsRoutingModule { }
