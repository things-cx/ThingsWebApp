import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './shared/http.service';
import { ThingsController, UserController, PostController } from 'api-typings/bundle';
import { LayoutModule } from './layout/layout.module';
import { AuthService } from './shared/auth.service';
import { PublicThingService } from './shared/public-thing.service';
import { FormService } from './shared/form.service';
import { TutorialService } from './tutorial/tutorial.service';
import { GaService } from './shared/ga.service';
import { LoggerService } from './shared/logger.service';
// import { LoggingService } from './shared/logging.service';

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
