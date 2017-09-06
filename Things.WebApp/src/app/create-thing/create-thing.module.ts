import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateThingComponent } from './create-thing/create-thing.component';
import { CreateThingRoutingModule } from './create-thing-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaUploaderService } from '../shared/media-uploader.service';
import { TutorialService } from '../tutorial/tutorial.service';
import { MdButtonModule, MdInputModule, MdProgressSpinnerModule, MdSelectModule, MdCardModule } from '@angular/material';
import { CreatePublicThingComponent } from './create-public-thing/create-public-thing.component';
import { AddShortcutComponent } from './add-shortcut/add-shortcut.component';

@NgModule({
  imports: [
    CommonModule,
    CreateThingRoutingModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdCardModule
  ],
  declarations: [
    CreateThingComponent,
    CreatePublicThingComponent,
    AddShortcutComponent
  ]
})
export class CreateThingModule { }
