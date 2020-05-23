import {Subject} from 'rxjs';

export class ImageUtil {
  static imageSubject$: Subject<void | HTMLImageElement> = new Subject();

  static loadImage(src: string): void {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        ImageUtil.imageSubject$.next(image);
      }
      image.onerror = (e) => {
        ImageUtil.imageSubject$.error(e);
      }
  }
}
