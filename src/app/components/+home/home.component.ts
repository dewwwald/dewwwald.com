import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  private head;
  private specticles;
  private leftHair;
  private rightHair;
  private leftBrow;
  private rightBrow;
  private leftEye;
  private rightEye;

  ngOnInit() {
    this.head = document.getElementById('head');
    this.specticles = document.getElementById('specticles');
    this.leftHair = document.getElementById('left-hair');
    this.rightHair = document.getElementById('right-hair');
    this.leftBrow = document.getElementById('left-brow');
    this.rightBrow = document.getElementById('right-brow');
    this.leftEye = document.getElementById('left-eye');
    this.rightEye = document.getElementById('right-eye');
    this.waitForGsap();
  }

  waitForGsap() {
    let _this = this;
    var gsapInterval = setInterval(() => {
      if (typeof TweenLite !== 'undefined') {
        window.requestAnimationFrame(() => {
          _this.initAnimation();
        });
        clearInterval(gsapInterval);
      }
    });
  }

  bounceHead(cb = () => {}) {
    var tween = new TweenLite(this.head, .1, { y: -5 });
    tween.eventCallback('onComplete', () => {
      TweenLite.to(this.head, .1, { y: 0 });
      cb();
    });
    tween.play();
  }

  turnFace(cb = () => {}) {
    var tween = new TweenLite(this.head, .35, { rotation: -26, x: '-23%', y: 35, scale: 1.03, transformOrigin: '50% 60%' });
    tween.eventCallback('onComplete', () => {
      cb();
    });
    tween.play();
  }

  resetFace(cb = () => {}) {
    var tween = new TweenLite(this.head, .25, { rotation: 0, x: '0%', y: 0, scale: 1});
    tween.eventCallback('onComplete', () => {
      cb();
    });
    tween.play();
  }

  frownUp(cb = () => {}) {
    var tween = new TweenLite([this.leftBrow, this.rightBrow], .35, { y: -5 });
    tween.eventCallback('onComplete', () => {
      cb();
    });
    tween.play();
  }

  frownDown(cb = () => {}) {
    var tween = new TweenLite([this.leftBrow, this.rightBrow], .35, { y: 10 });
    tween.eventCallback('onComplete', () => {
      cb();
    });
    tween.play();
  }

  resetFrown(cb = () => {}) {
    var tween = new TweenLite([this.leftBrow, this.rightBrow], .2, { y: 0 });
    tween.eventCallback('onComplete', () => {
      cb();
    });
    tween.play();
  }

  blinkClose(cb = () => {}) {
    [this.leftEye, this.rightEye].forEach((elm) => {
      elm.setAttribute('mask', 'url(#blink)');
    });
    var t = setTimeout(() => {
      cb();
      clearTimeout(t);
    }, 250);
  }

  blinkOpen(cb = () => {}) {
    [this.leftEye, this.rightEye].forEach((elm) => {
      elm.setAttribute('mask', undefined);
    });
    var t = setTimeout(() => {
      cb();
      clearTimeout(t);
    }, 125);
  }

  astonishment(cb = () => {}) {
    this.bounceHead(this.frownDown.bind(this,
    this.resetFrown.bind(this, () => {
      cb()
    })));
  }

  windInHair(cb = () => {}) {
    var tween = new TweenLite([this.leftHair, this.rightHair], .09, { rotation: 2, transformOrigin: '0% 90%' });
    tween.eventCallback('onComplete', () => {
      tween = new TweenLite([this.leftHair, this.rightHair], .175, { rotation: -9, transformOrigin: '0% 90%' });
      tween.eventCallback('onComplete', () => {
        tween = new TweenLite([this.leftHair, this.rightHair], .175, { rotation: 0, transformOrigin: '0% 90%' });
        tween.eventCallback('onComplete', () => {
          cb();
        });
        tween.play();
      });
      tween.play();
    });
    tween.play();
  }

  suffleGlasses(cb = () => {}) {
    var tween = new TweenLite(this.specticles, .2, { rotation: 5, transformOrigin: '50% 60%' });
    tween.eventCallback('onComplete', () => {
      tween = new TweenLite(this.specticles, .4, { rotation: -5, transformOrigin: '50% 60%' });
      this.blinkClose(this.blinkOpen.bind(this));
      tween.eventCallback('onComplete', () => {
        tween = new TweenLite(this.specticles, .2, { rotation: 0, transformOrigin: '50% 60%' });
        tween.eventCallback('onComplete', () => {
          cb();
        });
        tween.play();
      });
      tween.play();
    });
    tween.play();
  }

  delayAnimation(delay, cb = () => {}) {
    var t = setTimeout(() => {
      cb();
      clearTimeout(t);
    }, delay);
  }

  buildArgumentList(array, args = null) {
    if (array.length === 0) {
      return args;
    } else {
      args = this[array[0]].bind(this, args);
      array.splice(0, 1);
      return this.buildArgumentList(array, args);
    }
  }

  buildArguments(animationList) {
    var length = animationList.length;
    animationList.splice(0, 1);
    animationList.reverse();
    return this.buildArgumentList(animationList);
  }

  initRandomAnimation() {
    var t = setTimeout(() => {
      var sequences = [
        ['blinkClose', 'blinkOpen', 'initRandomAnimation'],
        ['blinkClose', 'blinkOpen', 'blinkClose', 'blinkOpen', 'initRandomAnimation'],
        ['astonishment', 'initRandomAnimation'],
        ['windInHair', 'initRandomAnimation']
      ];
      var index = Math.round(Math.random() * (sequences.length - 1));
      this[sequences[index][0]](this.buildArguments(sequences[index].slice()));
      clearTimeout(t);
    }, (Math.random() * 710 + 1540))
  }

  initAnimation() {
    this.delayAnimation(400,
      this.suffleGlasses.bind(this,
      this.astonishment.bind(this,
      this.turnFace.bind(this,
      this.blinkClose.bind(this,
      this.blinkOpen.bind(this,
      this.delayAnimation.bind(this, 125,
      this.resetFace.bind(this,
      this.delayAnimation.bind(this, 250,
      this.blinkClose.bind(this,
      this.blinkOpen.bind(this,
      this.blinkClose.bind(this,
      this.blinkOpen.bind(this,
      this.initRandomAnimation.bind(this)
      )))))))))))));
  }
}
