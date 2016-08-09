import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { DocumentService } from '../services/document.service';

@Directive({
  selector: '[myFullHeight]',
  providers: [
    DocumentService
  ]
})
export class FullHeightDirective
{
  private el;
  private doc;

  @HostListener('window:resize', ['$event'])
  private _resizeEventListiner()
  {
    this.el.style.height = this.doc.innerHeight;
  }

  constructor (el: ElementRef, doc: DocumentService)
  {
    this.doc = doc.nativeDocument;
    this.el = el.nativeElement;
    this.el.style.height = this.doc.innerHeight;
  }
}
