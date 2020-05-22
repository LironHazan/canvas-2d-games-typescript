import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TilemapConceptComponent} from "./tilemap-concept/tilemap-concept.component";
import {BallBricksComponent} from "./ball-bricks/ball-bricks.component";


const routes: Routes = [
  {
    path: 'tilemap',
    component: TilemapConceptComponent,
  },
  {
    path: 'ball-bricks-game',
    component: BallBricksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
