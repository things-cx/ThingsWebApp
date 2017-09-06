import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from '../layout/navigation/navigation.component';
import { OfficialPostersComponent } from '../official-posters/official-posters/official-posters.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: OfficialPostersComponent, data: { title: 'Official posters', nav: Navigation.Back } },
        ])
    ],
    exports: [RouterModule]
})
export class OfficialPostersRoutingModule { }
