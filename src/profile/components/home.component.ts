import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';

import { AspectsDirective } from '../directives/aspects.directive';
import { FullPageDirective } from '../directives/full-page.directive';

type FaceElementName =
  | 'head'
  | 'specticles'
  | 'left-hair'
  | 'right-hair'
  | 'left-brow'
  | 'right-brow'
  | 'left-eye'
  | 'right-eye';

@Component({
  selector: 'dewwwald-home',
  standalone: true,
  imports: [AspectsDirective, FullPageDirective],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly faceElements = new Map<FaceElementName, Element>();
  private stopped = false;
  private activeTimeout: number | undefined;
  protected logoPinned = false;

  ngAfterViewInit(): void {
    window.requestAnimationFrame(() => {
      this.updateLogoPin();
      this.collectFaceElements();
      void this.initAnimation();
    });
  }

  ngOnDestroy(): void {
    this.stopped = true;
    if (this.activeTimeout !== undefined) {
      window.clearTimeout(this.activeTimeout);
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected updateLogoPin(): void {
    const pinPoint = window.innerHeight - this.logoBottomOffset() - 72;
    this.logoPinned = window.scrollY >= pinPoint;
  }

  private logoBottomOffset(): number {
    return Math.min(Math.max(window.innerHeight * 0.05, 24), 54);
  }

  private collectFaceElements(): void {
    const names: readonly FaceElementName[] = [
      'head',
      'specticles',
      'left-hair',
      'right-hair',
      'left-brow',
      'right-brow',
      'left-eye',
      'right-eye',
    ];

    for (const name of names) {
      const element = this.host.querySelector(`#${name}`);
      if (element) {
        this.faceElements.set(name, element);
      }
    }
  }

  private async initAnimation(): Promise<void> {
    await this.delay(400);
    await this.suffleGlasses();
    await this.astonishment();
    await this.turnFace();
    await this.blink();
    await this.delay(125);
    await this.resetFace();
    await this.delay(250);
    await this.blink();
    await this.blink();
    void this.initRandomAnimation();
  }

  private async initRandomAnimation(): Promise<void> {
    while (!this.stopped) {
      await this.delay(Math.random() * 710 + 1540);
      const sequences = [
        () => this.blink(),
        () => this.doubleBlink(),
        () => this.astonishment(),
        () => this.windInHair(),
      ];
      const index = Math.floor(Math.random() * sequences.length);
      await sequences[index]();
    }
  }

  private async astonishment(): Promise<void> {
    await this.bounceHead();
    await this.frownDown();
    await this.resetFrown();
  }

  private async doubleBlink(): Promise<void> {
    await this.blink();
    await this.blink();
  }

  private async blink(): Promise<void> {
    this.blinkClose();
    await this.delay(250);
    this.blinkOpen();
    await this.delay(125);
  }

  private async bounceHead(): Promise<void> {
    await this.animateOne('head', [{ transform: 'translateY(6px)' }, { transform: 'translateY(1px)' }, { transform: 'translateY(6px)' }], {
      duration: 200,
      easing: 'ease-in-out',
    });
  }

  private async turnFace(): Promise<void> {
    await this.animateOne('head', [{ transform: 'translateY(6px) rotate(0deg) scale(1)' }, { transform: 'translateY(10px) rotate(-18deg) scale(1.02)' }], {
      duration: 350,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
  }

  private async resetFace(): Promise<void> {
    await this.animateOne('head', [{ transform: 'translateY(10px) rotate(-18deg) scale(1.02)' }, { transform: 'translateY(6px) rotate(0deg) scale(1)' }], {
      duration: 250,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
  }

  private async frownDown(): Promise<void> {
    await this.animateMany(['left-brow', 'right-brow'], [{ transform: 'translateY(0)' }, { transform: 'translateY(10px)' }], {
      duration: 350,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
  }

  private async resetFrown(): Promise<void> {
    await this.animateMany(['left-brow', 'right-brow'], [{ transform: 'translateY(10px)' }, { transform: 'translateY(0)' }], {
      duration: 200,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
  }

  private async windInHair(): Promise<void> {
    await this.animateMany(['left-hair', 'right-hair'], [{ transform: 'rotate(0deg)' }, { transform: 'rotate(2deg)' }], {
      duration: 90,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
    await this.animateMany(['left-hair', 'right-hair'], [{ transform: 'rotate(2deg)' }, { transform: 'rotate(-9deg)' }], {
      duration: 175,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
    await this.animateMany(['left-hair', 'right-hair'], [{ transform: 'rotate(-9deg)' }, { transform: 'rotate(0deg)' }], {
      duration: 175,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
  }

  private async suffleGlasses(): Promise<void> {
    await this.animateOne('specticles', [{ transform: 'rotate(0deg)' }, { transform: 'rotate(5deg)' }], {
      duration: 200,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
    this.blinkClose();
    await this.animateOne('specticles', [{ transform: 'rotate(5deg)' }, { transform: 'rotate(-5deg)' }], {
      duration: 400,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
    this.blinkOpen();
    await this.animateOne('specticles', [{ transform: 'rotate(-5deg)' }, { transform: 'rotate(0deg)' }], {
      duration: 200,
      easing: 'ease-in-out',
      fill: 'forwards',
    });
  }

  private blinkClose(): void {
    this.faceElements.get('left-eye')?.setAttribute('mask', 'url(#blink)');
    this.faceElements.get('right-eye')?.setAttribute('mask', 'url(#blink)');
  }

  private blinkOpen(): void {
    this.faceElements.get('left-eye')?.removeAttribute('mask');
    this.faceElements.get('right-eye')?.removeAttribute('mask');
  }

  private async animateOne(name: FaceElementName, keyframes: Keyframe[], options: KeyframeAnimationOptions): Promise<void> {
    const element = this.faceElements.get(name);
    if (!element || this.stopped) {
      return;
    }

    await this.waitForAnimation(element.animate(keyframes, options));
  }

  private async animateMany(names: FaceElementName[], keyframes: Keyframe[], options: KeyframeAnimationOptions): Promise<void> {
    const animations = names
      .map((name) => this.faceElements.get(name))
      .filter((element): element is Element => !!element)
      .map((element) => element.animate(keyframes, options));

    await Promise.all(animations.map((animation) => this.waitForAnimation(animation)));
  }

  private async waitForAnimation(animation: Animation): Promise<void> {
    try {
      await animation.finished;
    } catch {
      return;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      this.activeTimeout = window.setTimeout(() => {
        this.activeTimeout = undefined;
        resolve();
      }, ms);
    });
  }
}
