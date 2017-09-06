import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorizeComponent } from '../authorize/authorize/authorize.component';
import { Navigation } from '../layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: AuthorizeComponent, data: { title: 'Authorize', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class AuthorizeRoutingModule { }
