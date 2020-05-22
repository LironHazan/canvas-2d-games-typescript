import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BallGameUtil} from "./ball-game-util";

const BG = 'black';
const PADDLE_WIDTH = 100;
const MOVEP = 40;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;

@Component({
  selector: 'app-ball-bricks',
  templateUrl: './ball-bricks.component.html',
  styleUrls: ['./ball-bricks.component.scss']
})
export class BallBricksComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { read: ElementRef, static: true }) canvas;

  private ctx: CanvasRenderingContext2D;
  private ballX = 75;
  private ballY = 75;
  private ballSpeedX = 2;
  private ballSpeedY = 4;
  private paddleX = 400;

  constructor() { }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = BG;
    this.ctx.fillRect(0,0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.registerListeners();
    this.start();
  }

  updateMousePos(e: MouseEvent) {
    const { left } = this.canvas.nativeElement.getBoundingClientRect();
    const root = document.documentElement;
    const mouseX = e.clientX - left - root.scrollLeft;
    this.paddleX = mouseX - PADDLE_WIDTH/2;
  }

  registerListeners() {
    // replace with renderer
    this.canvas.nativeElement.addEventListener('mousemove', (e: MouseEvent) => this.updateMousePos(e));
    document.addEventListener('keydown', (e: KeyboardEvent) => this.keyPressed(e));
    document.addEventListener('keyup', (e: KeyboardEvent) => this.keyPressed(e));
  }

  keyPressed(e: KeyboardEvent) {
    //todo: fix a bug where it leaves the borders
    switch (e.key) {
      case 'ArrowLeft':
        this.paddleX = this.paddleX - MOVEP;
        break;
      case 'ArrowRight':
        this.paddleX = this.paddleX + MOVEP;
        break;
      default:
    }
  }

  start() {
    // https://developer.mozilla.org/en-US/docs/Games/Anatomy
    const gameLoop = () => {
      requestAnimationFrame(() => {
        this.updateAll();
        gameLoop();
      });
    }
    gameLoop();
  }

  updateAll() {
    this.moveAll();
    this.drawAll();
  }

  moveAll() {
    this.ballX += this.ballSpeedX;
    this.ballY += this.ballSpeedY;

    if(this.ballX < 0) { //left
      this.ballSpeedX *= -1;
    }
    if(this.ballX > this.canvas.nativeElement.width) { // right
      this.ballSpeedX *= -1;
    }
    if(this.ballY < 0) { // top
      this.ballSpeedY *= -1;
    }
    if(this.ballY > this.canvas.nativeElement.height) { // bottom
      this.ballReset();
    }

    const paddleTopEdgeY = this.canvas.nativeElement.height - PADDLE_DIST_FROM_EDGE;
    const paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    const paddleLeftEdgeX = this.paddleX;
    const paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

    if( this.ballY > paddleTopEdgeY && // below the top of paddle
      this.ballY < paddleBottomEdgeY && // above bottom of paddle
      this.ballX > paddleLeftEdgeX && // right of the left side of paddle
      this.ballX < paddleRightEdgeX ) { // left of the left side of paddle

      this.ballSpeedY *= -1;

      const centerOfPaddleX = this.paddleX + PADDLE_WIDTH/2;
      const ballDistFromPaddleCenterX = this.ballX - centerOfPaddleX;
      this.ballSpeedX = ballDistFromPaddleCenterX * 0.35;
    }
  }

  drawAll() {
    BallGameUtil.colorRect(this.ctx, 0,0, this.canvas.nativeElement.width,this.canvas.nativeElement.height, BG); // clear screen

    BallGameUtil.colorCircle(this.ctx, this.ballX,this.ballY, 10, 'white'); // draw ball

    BallGameUtil.colorRect(this.ctx, this.paddleX, this.canvas.nativeElement.height - PADDLE_DIST_FROM_EDGE,
      PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
  }

  ballReset() {
    this.ballX = this.canvas.nativeElement.width/2;
    this.ballY = this.canvas.nativeElement.height/2;
  }

  ngOnInit(): void {}

}
