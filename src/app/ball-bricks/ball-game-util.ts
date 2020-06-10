
//todo: checkout how can I combine MatterJs instead of some calcs that being done in here
//todo: add sound when hitting the ball
// using https://github.com/KilledByAPixel/ZzFX (or use webaudioContext myself..)
export class BallGameUtil {

    static colorRect(ctx: CanvasRenderingContext2D,
                     topLeftX: number,
                     topLeftY: number,
                     boxWidth: number,
                     boxHeight: number,
                     fillColor: string) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
    }

    static drawCircle(ctx: CanvasRenderingContext2D,
                      centerX: number,
                      centerY: number,
                      radius: number,
                      fillColor: string) {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(centerX,centerY, 10, 0,Math.PI*2, true);
        ctx.fill();
    }
}
