import { Component, OnInit } from '@angular/core';
import {BallPaddleGame} from "../games/ball-game";
import {SimpleTileMap} from "../games/simple-tile-map";

@Component({
  selector: 'app-ball-bricks',
  templateUrl: './ball-bricks.component.html',
  styleUrls: ['./ball-bricks.component.scss']
})
export class BallBricksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const ballGame = new BallPaddleGame();
    ballGame.start();
  }

}
