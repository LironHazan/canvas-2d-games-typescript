import {Component, OnInit} from '@angular/core';
import {BallPaddleGame} from "./games/ball-game";
import {SimpleTileMap} from "./games/simple-tile-map";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'canvas-tile-games';

  ngOnInit(): void {
  }
}
