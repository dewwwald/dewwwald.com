import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { WindowService } from '../services/window.service';
import { GraphService } from '../services/bar.service';

@Directive({
  selector: '[barChart]',
  providers: [
    GraphService
  ]
})
export class BarChartDirective
{
    private window;
    private canvas;
    private context;
    private width;
    private height;
    private barHeight;
    private barWidth;
    private bars;
    private gut;

    @Input('heightRatio') heightRatio;
    @Input('lengths') lengths;

    constructor (el: ElementRef, window: WindowService, graphService: GraphService)
    {
        this.window = window.nativeWindow;
        this.bars = graphService.getBar();
        this.canvas = el.nativeElement;
        this.context = this.canvas.getContext("2d");
    }

    setupDimentions()
    {
      this.canvas.style.width = '100%';
      var ratioheight = this.canvas.offsetWidth * this.heightRatio;
      ratioheight = ratioheight - ratioheight%1;
      this.canvas.style.height = ratioheight + 'px';
      this.canvas.style.width = this.canvas.offsetWidth - this.canvas.offsetWidth%1;
      this.width = this.canvas.offsetWidth;
      this.height = this.canvas.offsetHeight;
      this.canvas.setAttribute('width', this.width);
      this.canvas.setAttribute('height', this.height);
    }

    setupGraph()
    {
      this.context.fillStyle = "#000000";
      this.context.fillRect(0, this.height-30, this.width, 1);
      this.gut = 30;
      this.barHeight = this.height-30;
      this.barWidth = ((this.width-this.gut*4)/3);
      this.barWidth = this.barWidth - this.barWidth%1;
    }

    animateBar (index) {
      var i = index;
      var finalHeight = this.barHeight/100*this.bars[i].height;
      finalHeight = finalHeight - finalHeight%1;
      var step = 1;
      var interval = setInterval(() => {
        this.context.fillStyle = "#aaaaaa";
        this.context.fillRect(
          this.gut*(i+1)+this.barWidth*i,
          this.barHeight-step,
          this.barWidth,
          1
        );
        if (finalHeight == step)
        {
          clearInterval(interval)
        }
        step = step + 1;
      }, 2);
    }

    drawBars ()
    {
      for (var i = this.bars.length - 1; i >= 0; i--) {
        this.animateBar(i);
      }
    }

    ngOnInit ()
    {
      this.setupDimentions();
      this.setupGraph();
      this.drawBars();
    }
}
