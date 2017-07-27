import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorizeComponent } from 'app/authorize/authorize/authorize.component';
import { Navigation } from 'app/layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':id', component: AuthorizeComponent, data: { title: 'Authorize', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class AuthorizeRoutingModule { }
