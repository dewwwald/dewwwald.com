import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[dewwwaldSince]',
  standalone: true,
})
export class SinceDirective implements OnInit {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  ngOnInit(): void {
    const startYear = 2011;
    const years = new Date().getFullYear() - startYear;
    this.element.textContent = `${years}+ years`;
  }
}
