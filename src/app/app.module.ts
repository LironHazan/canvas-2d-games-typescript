import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TilemapConceptComponent } from './tilemap-concept/tilemap-concept.component';
import { BallBricksComponent } from './ball-bricks/ball-bricks.component';
import { NgMicroInteractModule } from 'ng-micro-interact';
import {NgZzfxModule} from "ng-zzfx";
import { LottieComponent } from './lottie/lottie.component';
import { S1LottieModule } from '@sentinel-one/s1-lottie';

@NgModule({
  declarations: [
    AppComponent,
    TilemapConceptComponent,
    BallBricksComponent,
    LottieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMicroInteractModule,
    NgZzfxModule,
    S1LottieModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
