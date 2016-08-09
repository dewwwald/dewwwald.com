import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { WindowService } from '../services/window.service';

@Directive({

})
export class BarChartDirective
{
    private window;
    private el;

    @Input('heightRatio') heightRatio;

    constructor (el: ElementRef, window: WindowService)
    {
        this.window = window.nativeWindow;
        this.el = el.nativeElement;
    }

    ngOnInit ()
    {
        this.el.style.height = this.el.innerWidth * this.heightRatio;
        this.el.style.width = this.window.innerWidth;
    }

}
