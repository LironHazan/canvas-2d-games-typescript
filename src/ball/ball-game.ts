const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
const FPS = 30;
const BG = 'black';

// TODO: support keys
export class BallPaddleGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private ballX = 75;
    private ballY = 75;
    private ballSpeedX = 2;
    private ballSpeedY = 4;
    private paddleX = 400;


    constructor() {
        this.setup();
    }

    static colorRect(ctx: CanvasRenderingContext2D,
                     topLeftX: number,
                     topLeftY: number,
                     boxWidth: number,
                     boxHeight: number,
                     fillColor: string) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
    }

    static colorCircle(ctx: CanvasRenderingContext2D, centerX: number,centerY: number, radius: number, fillColor: string) {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(centerX,centerY, 10, 0,Math.PI*2, true);
        ctx.fill();
    }

    setup() {
        this.canvas = document.querySelector('#renderer');
        this.ctx = this.canvas.getContext('2d'); // replace to webgl2
        this.ctx.fillStyle = BG;
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
        this.canvas.addEventListener('mousemove', (e) => this.updateMousePos(e));
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

    updateMousePos(e: MouseEvent) {
        const { left } = this.canvas.getBoundingClientRect();
        const root = document.documentElement;
        const mouseX = e.clientX - left - root.scrollLeft;
        this.paddleX = mouseX - PADDLE_WIDTH/2;
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
        if(this.ballX > this.canvas.width) { // right
            this.ballSpeedX *= -1;
        }
        if(this.ballY < 0) { // top
            this.ballSpeedY *= -1;
        }
        if(this.ballY > this.canvas.height) { // bottom
            this.ballReset();
        }

        const paddleTopEdgeY = this.canvas.height - PADDLE_DIST_FROM_EDGE;
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
        BallPaddleGame.colorRect(this.ctx, 0,0, this.canvas.width,this.canvas.height, BG); // clear screen

        BallPaddleGame.colorCircle(this.ctx, this.ballX,this.ballY, 10, 'white'); // draw ball

        BallPaddleGame.colorRect(this.ctx, this.paddleX, this.canvas.height - PADDLE_DIST_FROM_EDGE,
            PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
    }

    ballReset() {
        this.ballX = this.canvas.width/2;
        this.ballY = this.canvas.height/2;
    }
}
