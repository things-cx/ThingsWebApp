import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'app/login/login/login.component';
import { Navigation } from 'app/layout/navigation/navigation.component';
import { NewsletterComponent } from 'app/newsletter/newsletter/newsletter.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: NewsletterComponent, data: { title: 'Newsletter', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class NewsletterRoutingModule { }
