import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TutorialComponent } from '../tutorial/tutorial/tutorial.component';
import { Navigation } from '../layout/navigation/navigation.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':type', component: TutorialComponent, data: { title: 'Tutorial' } }
        ])
    ],
    exports: [RouterModule]
})
export class TutorialRoutingModule { }
