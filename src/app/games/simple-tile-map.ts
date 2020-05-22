// Reading resources:
// https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps

// resize rendering solution taken from:
// https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/tile-world/tile-world.js

import { ImageUtil } from "../utils/image-util";

export class SimpleTileMap {

    private bufferCanvas: HTMLCanvasElement;
    private bufferCtx: CanvasRenderingContext2D;
    private drawOnCanvas: HTMLCanvasElement;
    private drawOnCtx: CanvasRenderingContext2D;
    private row = 16;
    private col = 9;
    private tileSize = 32;
    private map = [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 2,
        2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 2,
        2, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2,
        2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 2,
        2, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 2,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

    constructor() {
        this.setup();

        ImageUtil.loadImage('assets/tiles.png')
            .then((image: HTMLImageElement) => {
                console.log(image);
            })
            .catch(() => {
                this.drawOnCtx.fillText("Error in loading IMAGES", this.drawOnCanvas.width / 2, this.drawOnCanvas.width / 2);
            });

        // I rather use resizeObserver will switch to that..
        this.observeResize();
    }

    private setup() {
        this.bufferCanvas = document.createElement('canvas')
        this.bufferCtx = this.bufferCanvas.getContext('2d');
        this.drawOnCanvas = document.querySelector('#renderer');
        this.drawOnCtx = this.drawOnCanvas.getContext('2d');
        this.bufferCanvas.width = this.row * this.tileSize;
        this.bufferCanvas.height = this.col * this.tileSize;
    }

    private observeResize() {
        window.addEventListener('resize', () => {
            this.drawOnCanvas.width = Math.floor(document.body.clientHeight - this.tileSize);
            if (this.drawOnCanvas.width > document.body.clientHeight) {
                this.drawOnCanvas.width = Math.floor(document.body.clientHeight);
            }
            this.drawOnCanvas.height = Math.floor(this.drawOnCanvas.width * 0.5625);
            this.renderTileMap();
        }, {passive:true});
    }

    public renderTileMap() {
        for (const [index, value] of this.map.entries()) {
            switch (value) {
                case 0:
                this.bufferCtx.fillStyle = '#ffffff';
                break
                case 1:
                this.bufferCtx.fillStyle = '#000000';
                break
                case 2:
                this.bufferCtx.fillStyle = '#000ff0';
                break
            }
            //this.bufferCtx.fillStyle = value === 1 ? '#000000' : '#ffffff';
            const x = (index % this.row) * this.tileSize;
            const y = Math.floor(index / this.row) * this.tileSize;
            this.bufferCtx.fillRect(x, y, this.tileSize, this.tileSize);
        }
        this.drawOnCtx.drawImage(this.bufferCanvas,
            0,
            0,
            this.bufferCanvas.width,
            this.bufferCanvas.height,
            0,
            0,
            this.drawOnCanvas.width,
            this.drawOnCanvas.height
        );

    }
}
