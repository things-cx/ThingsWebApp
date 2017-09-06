import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login/login.component';
import { Navigation } from '../layout/navigation/navigation.component';
import { NewsletterComponent } from '../newsletter/newsletter/newsletter.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: NewsletterComponent, data: { title: 'Newsletter', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class NewsletterRoutingModule { }
