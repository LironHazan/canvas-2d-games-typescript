import { Component } from '@angular/core';
import { S1LottieConfig } from "@sentinel-one/s1-lottie";
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-lottie',
  templateUrl: './lottie.component.html',
  styleUrls: ['./lottie.component.scss']
})
export class LottieComponent {
  animator: Readonly<AnimationItem>;
  constructor() { }

  public lottieParams: S1LottieConfig = {
    path: 'assets/lottie/spinner.json',
    renderer: 'canvas',
    loop: false,
    autoplay: true
  };

  private play() {
    this.animator.play();
    this.animator.setSpeed(0.8);
  }

  public onAnimationCreated(animation: AnimationItem) {
    this.animator = animation;
    this.play();
  }

}
