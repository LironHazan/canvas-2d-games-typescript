import { Component, OnInit } from '@angular/core';
import {BallPaddleGame} from "../games/ball-game";
import {SimpleTileMap} from "../games/simple-tile-map";

@Component({
  selector: 'app-tilemap-concept',
  templateUrl: './tilemap-concept.component.html',
  styleUrls: ['./tilemap-concept.component.scss']
})
export class TilemapConceptComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const tilemap = new SimpleTileMap();
    tilemap.renderTileMap();
  }

}
