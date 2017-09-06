import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InterestsComponent } from '../interests/interests/interests.component';
import { Navigation } from '../layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: InterestsComponent, data: { title: 'Interests', nav: Navigation.Primary } }
        ])
    ],
    exports: [RouterModule]
})
export class InterestsRoutingModule { }
