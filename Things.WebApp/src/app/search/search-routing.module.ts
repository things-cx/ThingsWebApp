import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navigation } from '../layout/navigation/navigation.component';
import { DiscoverComponent } from '../search/discover/discover.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: DiscoverComponent, data: { title: 'Discover', nav: Navigation.Primary } },
        ])
    ],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
