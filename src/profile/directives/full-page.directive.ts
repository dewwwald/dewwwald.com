import { AfterViewInit, Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[dewwwaldFullPage]',
  standalone: true,
})
export class FullPageDirective implements AfterViewInit {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  ngAfterViewInit(): void {
    this.setHeight();
  }

  @HostListener('window:resize')
  setHeight(): void {
    this.element.style.height = 'auto';
    this.element.style.minHeight = `${window.innerHeight}px`;

    if (this.element.offsetHeight < window.innerHeight) {
      this.element.style.height = `${window.innerHeight}px`;
    }
  }
}
