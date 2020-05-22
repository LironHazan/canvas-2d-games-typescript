export class ImageUtil {
  // todo: replace with rxjs
    static loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                resolve(image);
            }
            image.onerror = (e) => {
                reject(e);
            }
        })
    }
}
