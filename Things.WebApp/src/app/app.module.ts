import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './shared/http.service';
// import { LoggingService } from './shared/logging.service';
import { ThingsController, UserController, PostController } from 'api-typings/bundle';
// import { TutorialService } from 'app/tutorial/tutorial.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from 'app/layout/layout.module';
import { MdInputModule } from '@angular/material';
import { AuthService } from 'app/shared/auth.service';
import { PublicThingService } from 'app/shared/public-thing.service';
import { FormService } from 'app/shared/form.service';
import { TutorialService } from 'app/tutorial/tutorial.service';
import { EditorComponent } from './shared/editor/editor/editor.component';
import { LinkComponent } from './shared/editor/link/link.component';
import { MentionComponent } from './shared/editor/mention/mention.component';
import { ImageComponent } from './shared/editor/image/image.component';
import { GaService } from 'app/shared/ga.service';
import { LoggerService } from 'app/shared/logger.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    LayoutModule,
    BrowserAnimationsModule
  ],
  providers: [
    ThingsController,
    UserController,
    PostController,
    HttpService,
    Title,
    AuthService,
    PublicThingService,
    FormService,
    TutorialService,
    GaService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
