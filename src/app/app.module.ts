import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TilemapConceptComponent } from './tilemap-concept/tilemap-concept.component';
import { BallBricksComponent } from './ball-bricks/ball-bricks.component';
import { NgMicroInteractModule } from 'ng-micro-interact';
import {NgZzfxModule} from "ng-zzfx";

@NgModule({
  declarations: [
    AppComponent,
    TilemapConceptComponent,
    BallBricksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMicroInteractModule,
    NgZzfxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
