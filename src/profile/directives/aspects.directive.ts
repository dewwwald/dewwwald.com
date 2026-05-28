import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

interface AspectPart {
  readonly value: string;
  readonly emphasis?: boolean;
}

@Directive({
  selector: '[dewwwaldAspects]',
  standalone: true,
})
export class AspectsDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly keystrokeDelay = 45;
  private readonly holdDelay = 2600;
  private timeoutId: number | undefined;
  private index = 0;
  private stopped = false;

  private readonly aspects: readonly AspectPart[][] = [
    [{ value: 'I build platforms, teams, and ' }, { value: 'clarity.', emphasis: true }],
    [{ value: 'I modernize legacy systems without losing the ' }, { value: 'plot.', emphasis: true }],
    [{ value: 'I use AI workflows to make engineering work ' }, { value: 'lighter.', emphasis: true }],
    [{ value: 'I like architecture that earns its ' }, { value: 'keep.', emphasis: true }],
    [{ value: 'I write about the messy middle of ' }, { value: 'software.', emphasis: true }],
    [{ value: 'Hello, I am ' }, { value: 'Dewald.', emphasis: true }],
  ];

  ngAfterViewInit(): void {
    this.timeoutId = window.setTimeout(() => void this.swapText(), 3000);
  }

  ngOnDestroy(): void {
    this.stopped = true;
    if (this.timeoutId !== undefined) {
      window.clearTimeout(this.timeoutId);
    }
  }

  private async swapText(): Promise<void> {
    if (this.stopped) {
      return;
    }

    this.element.classList.add('typing', 'highlight');
    await this.delay(this.keystrokeDelay * 12);
    this.element.innerHTML = '';
    this.element.classList.remove('highlight');

    const aspect = this.nextAspect();
    for (const part of aspect) {
      await this.typePart(part);
    }

    this.timeoutId = window.setTimeout(() => void this.swapText(), this.holdDelay);
  }

  private nextAspect(): readonly AspectPart[] {
    const aspect = this.aspects[this.index];
    this.index = (this.index + 1) % this.aspects.length;
    return aspect;
  }

  private async typePart(part: AspectPart): Promise<void> {
    const target = part.emphasis ? document.createElement('span') : this.element;
    if (part.emphasis) {
      this.element.appendChild(target);
    }

    for (let i = 0; i <= part.value.length; i++) {
      target.textContent = part.value.slice(0, i);
      await this.delay(this.keystrokeDelay);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      this.timeoutId = window.setTimeout(resolve, ms);
    });
  }
}
