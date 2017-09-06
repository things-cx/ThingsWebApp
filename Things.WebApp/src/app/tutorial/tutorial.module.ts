import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialRoutingModule } from '../tutorial/tutorial-routing.module';
import { TutorialComponent } from '../tutorial/tutorial/tutorial.component';
import { TutorialService } from '../tutorial/tutorial.service';
import { MdButtonModule, MdCardModule } from '@angular/material';
import { FirstTimeUserComponent } from './first-time-user/first-time-user.component';
import { CreatePublicThingComponent } from './create-public-thing/create-public-thing.component';
import { CreateThingComponent } from './create-thing/create-thing.component';
import { EditThingTagsComponent } from './edit-thing-tags/edit-thing-tags.component';
import { EditThingDescriptionComponent } from './edit-thing-description/edit-thing-description.component';
import { EditThingMediaComponent } from './edit-thing-media/edit-thing-media.component';
import { ThingDetailsComponent } from './thing-details/thing-details.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditAmazonComponent } from './edit-amazon/edit-amazon.component';
import { CreateShortcutThingComponent } from './create-shortcut-thing/create-shortcut-thing.component';

@NgModule({
  imports: [
    CommonModule,
    TutorialRoutingModule,
    MdButtonModule,
    MdCardModule
  ],
  declarations: [
    TutorialComponent,
    FirstTimeUserComponent,
    CreatePublicThingComponent,
    CreateThingComponent,
    EditThingTagsComponent,
    EditThingDescriptionComponent,
    EditThingMediaComponent,
    ThingDetailsComponent,
    CreatePostComponent,
    EditAmazonComponent,
    CreateShortcutThingComponent
  ],
  providers: [TutorialService]
})
export class TutorialModule { }
