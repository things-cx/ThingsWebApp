import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'app/login/login/login.component';
import { Navigation } from 'app/layout/navigation/navigation.component';
import { FeedbackComponent } from 'app/feedback/feedback/feedback.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: FeedbackComponent, data: { title: 'Feedback', nav: Navigation.Back } }
        ])
    ],
    exports: [RouterModule]
})
export class FeedbackRoutingModule { }
