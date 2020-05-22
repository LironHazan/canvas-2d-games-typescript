import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ImageUtil} from "../utils/image-util";

// tiles png were taken from
// https://github.com/mozdevs/gamedev-js-tiles/tree/6e25f5a891641cbe4d60bfbbaa11df01ff594add
@Component({
  selector: 'app-tilemap-concept',
  templateUrl: './tilemap-concept.component.html',
  styleUrls: ['./tilemap-concept.component.scss']
})
export class TilemapConceptComponent implements AfterViewInit {

  @ViewChild('canvas', { read: ElementRef, static: true }) canvas;

  private drawOnCtx: CanvasRenderingContext2D;
  private row = 16;
  private tileSize = 32;
  private map = [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
    2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 2,
    2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 2,
    2, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 2,
    2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 2,
    2, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 2,
    2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

  ngAfterViewInit(): void {
    this.drawOnCtx = this.canvas.nativeElement.getContext('2d');
    ImageUtil.loadImage('assets/tiles.png')
      .then((image: HTMLImageElement) => {
        console.log(image);
        this.renderTileMap(image);
      })
      .catch(() => {
        this.drawOnCtx.fillText("Error in loading IMAGES",
          this.canvas.nativeElement.width / 2,
          this.canvas.nativeElement.width / 2);
      });
  }

  public renderTileMap(image) {
    for (const [index, value] of this.map.entries()) {
      switch (value) {
        case 0:
          this.drawOnCtx.fillStyle = '#ffffff';
          break
        case 1:
          this.drawOnCtx.fillStyle = '#000000';
          break
        case 2:
          this.drawOnCtx.fillStyle = '#000ff0';
          break
      }
      const x = (index % this.row) * this.tileSize;
      const y = Math.floor(index / this.row) * this.tileSize;
      this.drawOnCtx.fillRect(x, y, this.tileSize, this.tileSize);
    }
    this.drawOnCtx.drawImage(
      image,
      17,
      10);
  }

}
