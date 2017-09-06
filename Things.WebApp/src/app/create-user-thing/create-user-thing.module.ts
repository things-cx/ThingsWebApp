import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserThingFormComponent } from './create-user-thing-form/create-user-thing-form.component';
import { CreateUserThingRoutingModule } from './create-user-thing-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaUploaderService } from '../shared/media-uploader.service';
import { TutorialService } from '../tutorial/tutorial.service';
import { MdButtonModule, MdInputModule, MdProgressSpinnerModule, MdCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CreateUserThingRoutingModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdCardModule
  ],
  declarations: [
    CreateUserThingFormComponent
  ]
})
export class CreateUserThingModule { }
