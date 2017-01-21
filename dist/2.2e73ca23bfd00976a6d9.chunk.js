webpackJsonp([2],{1016:function(t,e,r){"use strict";var n=r(1),a=r(256),o=r(998);r.d(e,"a",function(){return s});var i=[{path:"",component:o.a}],s=function(){function t(){}return t=__decorate([r.i(n.NgModule)({imports:[a.a.forChild(i)],exports:[a.a]}),__metadata("design:paramtypes",[])],t)}()},1022:function(t,e,r){"use strict";var n=r(1),a=r(257);r.d(e,"a",function(){return o});var o=function(){function t(t){this.el=t.nativeElement,this.since=new Date("Sun Jan 31 2014 08:30:00 GMT+0200 (SAST)"),this.current=new Date}return t.prototype.ngOnInit=function(){this.incrementSince()},t.prototype.incrementSince=function(t){void 0===t&&(t=0);var e=this,r=0;t-t%12!=0&&(r=(t-t%12)/12);var n=t%12;if(this.setSince(r,n),r!=this.current.getYear()-this.since.getYear()||n!=this.current.getMonth()-this.since.getMonth())var a=setTimeout(function(){e.incrementSince.call(e,t+1),clearTimeout(a)},40)},t.prototype.setSince=function(t,e){var r="";t>0&&(r+=t+" years"),r+=t>0?" | "+e+" months":" "+e+" months",this.el.innerHTML=r},t=__decorate([r.i(n.Directive)({selector:"[since]",providers:[a.a]}),__metadata("design:paramtypes",[n.ElementRef])],t)}()},1025:function(t,e,r){"use strict";var n=r(1),a=r(999);r.d(e,"a",function(){return o});var o=function(){function t(t){this.chartService=t,this.barChartOptions={scaleShowVerticalLines:!1,responsive:!0},this.barChartType="bar",this.barChartLegend=!1,this.barDefaultColor=["rgba(255, 255, 255, 1)","rgba(255, 255, 255, 1)"],this.barChartLabels=[],this.barChartData=[]}return t.prototype.chartClicked=function(t){console.log(t)},t.prototype.chartHovered=function(t){console.log(t)},t.prototype.onProgress=function(){console.log(arguments)},t.prototype.ngOnInit=function(){this.chartService.retrieveData(this.dataKey),this.barChartLabels=this.chartService.getLabels(),this.barChartData=this.chartService.getData()},__decorate([r.i(n.Input)("dataKey"),__metadata("design:type",String)],t.prototype,"dataKey",void 0),t=__decorate([r.i(n.Component)({selector:"unique-ng2-chart",template:r(1039),providers:[a.a]}),__metadata("design:paramtypes",[a.a])],t)}()},1032:function(t,e,r){"use strict";function n(t,e){return"rgba("+t.concat(e).join(",")+")"}function a(t,e){return Math.floor(Math.random()*(e-t+1))+t}function o(t){return{backgroundColor:n(t,.4),borderColor:n(t,1),pointBackgroundColor:n(t,1),pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:n(t,.8)}}function i(t){return{backgroundColor:n(t,.6),borderColor:n(t,1),hoverBackgroundColor:n(t,.8),hoverBorderColor:n(t,1)}}function s(t){return{backgroundColor:t.map(function(t){return n(t,.6)}),borderColor:t.map(function(){return"#fff"}),pointBackgroundColor:t.map(function(t){return n(t,1)}),pointBorderColor:t.map(function(){return"#fff"}),pointHoverBackgroundColor:t.map(function(t){return n(t,1)}),pointHoverBorderColor:t.map(function(t){return n(t,1)})}}function c(t){return{backgroundColor:t.map(function(t){return n(t,.6)}),borderColor:t.map(function(t){return n(t,1)}),hoverBackgroundColor:t.map(function(t){return n(t,.8)}),hoverBorderColor:t.map(function(t){return n(t,1)})}}function u(){return[a(0,255),a(0,255),a(0,255)]}function h(t){return f.defaultColors[t]||u()}function l(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=f.defaultColors[r]||u();return e}function d(t,e,r){return"pie"===t||"doughnut"===t?s(l(r)):"polarArea"===t?c(l(r)):"line"===t||"radar"===t?o(h(e)):"bar"===t||"horizontalBar"===t?i(h(e)):h(e)}var p=r(1),f=function(){function t(t){this.labels=[],this.options={},this.chartClick=new p.EventEmitter,this.chartHover=new p.EventEmitter,this.initFlag=!1,this.element=t}return t.prototype.ngOnInit=function(){this.ctx=this.element.nativeElement.getContext("2d"),this.cvs=this.element.nativeElement,this.initFlag=!0,(this.data||this.datasets)&&this.refresh()},t.prototype.ngOnChanges=function(t){this.initFlag&&(t.hasOwnProperty("data")||t.hasOwnProperty("datasets")||t.hasOwnProperty("labels")?(this.chart.data.datasets=this.getDatasets(),this.chart.data.labels=this.labels,this.chart.update()):this.refresh())},t.prototype.ngOnDestroy=function(){this.chart&&(this.chart.destroy(),this.chart=void 0)},t.prototype.getChartBuilder=function(t){var e=this,r=this.getDatasets(),n=Object.assign({},this.options);this.legend===!1&&(n.legend={display:!1}),n.hover=n.hover||{},n.hover.onHover||(n.hover.onHover=function(t){t&&!t.length||e.chartHover.emit({active:t})}),n.onClick||(n.onClick=function(t,r){e.chartClick.emit({event:t,active:r})});var a={type:this.chartType,data:{labels:this.labels,datasets:r},options:n};if("undefined"==typeof Chart)throw new Error("ng2-charts configuration issue: Embedding Chart.js lib is mandatory");return new Chart(t,a)},t.prototype.getDatasets=function(){var t=this,e=void 0;if((!this.datasets||!this.datasets.length&&this.data&&this.data.length)&&(e=Array.isArray(this.data[0])?this.data.map(function(e,r){return{data:e,label:t.labels[r]||"Label "+r}}):[{data:this.data,label:"Label 0"}]),(this.datasets&&this.datasets.length||e&&e.length)&&(e=(this.datasets||e).map(function(e,r){var n=Object.assign({},e);return t.colors&&t.colors.length?Object.assign(n,t.colors[r]):Object.assign(n,d(t.chartType,r,n.data.length)),n})),!e)throw new Error("ng-charts configuration error,\n      data or datasets field are required to render char "+this.chartType);return e},t.prototype.refresh=function(){this.ngOnDestroy(),this.chart=this.getChartBuilder(this.ctx)},t.defaultColors=[[255,99,132],[54,162,235],[255,206,86],[231,233,237],[75,192,192],[151,187,205],[220,220,220],[247,70,74],[70,191,189],[253,180,92],[148,159,177],[77,83,96]],t.decorators=[{type:p.Directive,args:[{selector:"canvas[baseChart]",exportAs:"base-chart"}]}],t.ctorParameters=[{type:p.ElementRef}],t.propDecorators={data:[{type:p.Input}],datasets:[{type:p.Input}],labels:[{type:p.Input}],options:[{type:p.Input}],chartType:[{type:p.Input}],colors:[{type:p.Input}],legend:[{type:p.Input}],chartClick:[{type:p.Output}],chartHover:[{type:p.Output}]},t}();e.BaseChartDirective=f;var g=function(){function t(){}return t.decorators=[{type:p.NgModule,args:[{declarations:[f],exports:[f],imports:[]}]}],t.ctorParameters=[],t}();e.ChartsModule=g},1033:function(t,e,r){"use strict";function n(t){for(var r in t)e.hasOwnProperty(r)||(e[r]=t[r])}n(r(1032))},1037:function(t,e){t.exports='<section class="soft--large bgc--tertiary">\n  <h1>\n    why_ <small>pick me?</small>\n  </h1>\n  <p>\n    <strong><em since></em></strong> of work experience, and counting!\n  </p>\n  <p class="flush--bottom">\n    I am a young full stack web developer with an eye for beautiful design and rich, interactive user interfaces. I have experience in various frameworks and Content Management Systems. My academic B.Sc degree in Computer Science and Information Technology provides a solid base for growth. I like taking ownership of my work and really enjoy working in a team environment. I am always eager to collaborate, learn new things and solve a problem over a cup of coffee.\n  </p>\n</section>\n<section class="soft--large">\n  <h2 class="flush--bottom">My Skills:</h2>\n</section>\n<section class="soft--large bgc--tertiary">\n  <h4 class="flush--bottom">Front End</h4>\n  <p>Software development skills relating to the browser</p>\n  <unique-ng2-chart [dataKey]="\'frontEnd\'"></unique-ng2-chart>\n</section>\n<section class="soft--large">\n  <h4 class="flush--bottom">Back End</h4>\n  <p>Software development skills relating to the server of an application</p>\n  <unique-ng2-chart [dataKey]="\'backEnd\'"></unique-ng2-chart>\n</section>\n'},1039:function(t,e){t.exports='<div>\n  <div style="display: block">\n    <canvas baseChart width="400px"\n      [colors]="barDefaultColor"\n      [datasets]="barChartData"\n      [labels]="barChartLabels"\n      [options]="barChartOptions"\n      [legend]="barChartLegend"\n      [chartType]="barChartType"\n      (chartHover)="chartHovered($event)"\n      (chartClick)="chartClicked($event)"></canvas>\n  </div>\n</div>\n'},954:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(1),a=r(1033),o=(r.n(a),r(1016)),i=r(1022),s=r(1025),c=r(998),u=r(999);r.d(e,"WhyModule",function(){return h});var h=function(){function t(){}return t=__decorate([r.i(n.NgModule)({imports:[o.a,a.ChartsModule],declarations:[c.a,i.a,s.a],providers:[u.a]}),__metadata("design:paramtypes",[])],t)}()},998:function(t,e,r){"use strict";var n=r(1);r.d(e,"a",function(){return a});var a=function(){function t(){}return t=__decorate([r.i(n.Component)({selector:"main",template:r(1037)}),__metadata("design:paramtypes",[])],t)}()},999:function(t,e,r){"use strict";var n=r(1);r.d(e,"a",function(){return a});var a=function(){function t(){this.labels={frontEnd:["HTML","CSS","Javascript","Angular","UI/UX"],backEnd:["Node.js","PHP","Web frameworks","Automation","Web Server"]},this.dataPoints={frontEnd:[{data:[90,95,92,85,80,0],backgroundColor:["rgba(255, 255, 255, .7)","rgba(255, 255, 255, .7)","rgba(255, 255, 255, .7)","rgba(255, 255, 255, .7)","rgba(255, 255, 255, .7)","rgba(255, 255, 255, .7)"]}],backEnd:[{data:[90,95,85,75,75,0],backgroundColor:["rgba(245,121,95, .7)","rgba(245,121,95, .7)","rgba(245,121,95, .7)","rgba(245,121,95, .7)","rgba(245,121,95, .7)","rgba(245,121,95, .7)"]}]}}return t.prototype.getLabels=function(){return this.labels[this.dataKey]},t.prototype.getData=function(){return this.dataPoints[this.dataKey]},t.prototype.retrieveData=function(t){this.dataKey=t},t=__decorate([r.i(n.Injectable)(),__metadata("design:paramtypes",[])],t)}()}});