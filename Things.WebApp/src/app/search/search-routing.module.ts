import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { Navigation } from 'app/layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: SearchComponent, data: { title: 'Search', nav: Navigation.Primary } },
        ])
    ],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
