import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {ImageUtil} from '../utils/image-util';
import { Subscription } from 'rxjs';

// tiles png were taken from
// https://github.com/mozdevs/gamedev-js-tiles/tree/6e25f5a891641cbe4d60bfbbaa11df01ff594add
@Component({
  selector: 'app-tilemap-concept',
  templateUrl: './tilemap-concept.component.html',
  styleUrls: ['./tilemap-concept.component.scss']
})
export class TilemapConceptComponent implements AfterViewInit, OnDestroy {

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

  private imageUtilSub$: Subscription;

  ngAfterViewInit(): void {
    this.drawOnCtx = this.canvas.nativeElement.getContext('2d');
    ImageUtil.loadImage('assets/tiles.png');

    this.imageUtilSub$ = ImageUtil.imageSubject$
      .subscribe((image: HTMLImageElement) => {
      this.renderTileMap(image);
    }, (e) => {
        this.drawOnCtx.fillText('Error in loading IMAGES',
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

  ngOnDestroy(): void {
    this.imageUtilSub$ && this.imageUtilSub$.unsubscribe();
  }

}
