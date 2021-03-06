import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BallGameUtil} from './ball-game-util';
import {Zoundfx} from 'ng-zzfx';

const BG = 'black';
const PADDLE_WIDTH = 100;
const MOVEP = 40;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
const TRIES = 5;

@Component({
  selector: 'app-ball-bricks',
  templateUrl: './ball-bricks.component.html',
  styleUrls: ['./ball-bricks.component.scss']
})
export class BallBricksComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { read: ElementRef, static: true }) canvas;

  private ctx: CanvasRenderingContext2D;
  private ballX = 75;
  private ballY = 75;
  private ballSpeedX = 2;
  private ballSpeedY = 4;
  private paddleX = 400;
  private rAFId;
  private hitBallSound;
  private loseBallSound;
  score = 0;
  finalScore = 0;
  gameOverCounter = 5;


  constructor() { }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = BG;
    this.ctx.fillRect(0,0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.registerListeners();
    this.start();
  }

  private updateMousePos(e: MouseEvent) {
    const { left } = this.canvas.nativeElement.getBoundingClientRect();
    const root = document.documentElement;
    const mouseX = e.clientX - left - root.scrollLeft;
    this.paddleX = mouseX - PADDLE_WIDTH/2;
  }

  private registerListeners() {
    // replace with renderer
    this.canvas.nativeElement.addEventListener('mousemove', (e: MouseEvent) => this.updateMousePos(e));
    document.addEventListener('keydown', (e: KeyboardEvent) => this.keyPressed(e));
    document.addEventListener('keyup', (e: KeyboardEvent) => this.keyPressed(e));
  }

  private keyPressed(e: KeyboardEvent) {
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

  public getScore() {
    return this.score !== 0 ? this.score : this.finalScore;
  }

  private start() {
    // https://developer.mozilla.org/en-US/docs/Games/Anatomy
    const gameLoop = () => {
    this.rAFId = requestAnimationFrame(() => {
        this.updateAll();
        if (this.gameOverCounter !== 0) {
          return gameLoop();
        }
        this.onGameTermination();
      });
    }
   gameLoop();
  }

  private updateAll() {
    this.moveAll();
    this.drawAll();
  }

  private onGameTermination() {
    this.finalScore = this.score;
    BallGameUtil.colorRect(this.ctx, 0,0, this.canvas.nativeElement.width,this.canvas.nativeElement.height, 'tomato'); // clear screen
    cancelAnimationFrame(this.rAFId);
  };

  private moveAll() {
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
      this.loseBallSound([,,224,.02,.02,.08,1,1.7,-13.9,,,,,,6.7]);
      if (this.gameOverCounter <= TRIES && this.gameOverCounter !== 0) {
        this.gameOverCounter = --this.gameOverCounter;
      }
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
      this.score = ++this.score;
      this.hitBallSound([1.5,.5,270,,.1,,1,1.5,,,,,,,,.1,.01]);

      this.ballSpeedY *= -1;

      const centerOfPaddleX = this.paddleX + PADDLE_WIDTH/2;
      const ballDistFromPaddleCenterX = this.ballX - centerOfPaddleX;
      this.ballSpeedX = ballDistFromPaddleCenterX * 0.35;
    }
  }

  private drawAll() {
    BallGameUtil.colorRect(this.ctx, 0,0, this.canvas.nativeElement.width,
      this.canvas.nativeElement.height, BG); // clear screen
    BallGameUtil.drawCircle(this.ctx, this.ballX,this.ballY, 10, 'white'); // draw ball
    BallGameUtil.colorRect(this.ctx, this.paddleX, this.canvas.nativeElement.height - PADDLE_DIST_FROM_EDGE,
      PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
  }

  ballReset() {
    this.ballX = this.canvas.nativeElement.width/2;
    this.ballY = this.canvas.nativeElement.height/2;
  }

  async ngOnInit() {
    this.hitBallSound = Zoundfx.start(0.2);
    this.loseBallSound = Zoundfx.start(0.2);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rAFId);
  }

}
