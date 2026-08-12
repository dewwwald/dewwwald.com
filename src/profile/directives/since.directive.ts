import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[dewwwaldSince]',
  standalone: true,
})
export class SinceDirective implements OnInit {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  ngOnInit(): void {
    const startDate = new Date(2014, 1, 1);
    const today = new Date();
    let years = today.getFullYear() - startDate.getFullYear();

    if (
      today.getMonth() < startDate.getMonth() ||
      (today.getMonth() === startDate.getMonth() && today.getDate() < startDate.getDate())
    ) {
      years -= 1;
    }

    this.element.textContent = `${years}+ years`;
  }
}
