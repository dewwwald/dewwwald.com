webpackJsonp([3],{1014:function(e,t,i){"use strict";var o=i(1),s=i(256),n=i(995);i.d(t,"a",function(){return r});var a=[{path:"",component:n.a}],r=function(){function e(){}return e=__decorate([i.i(o.NgModule)({imports:[s.a.forChild(a)],exports:[s.a]}),__metadata("design:paramtypes",[])],e)}()},1019:function(e,t,i){"use strict";var o=i(1);i.d(t,"a",function(){return s});var s=function(){function e(e){this.el=e.nativeElement}return e.prototype.ngOnInit=function(){this.setColors(),this.params(),"undefined"!=typeof this.opacity?this.el.style.backgroundColor="rgba("+this.hexToRgb(this.colors[this.index%3].hex)+", "+this.opacity+")":this.el.classNamr+=" "+this.colors[this.index%3].class},e.prototype.hexToRgb=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+","+parseInt(t[2],16)+","+parseInt(t[3],16):null},e.prototype.params=function(){var e=this,t=this.colorPar.split(",");t.forEach(function(t,i){switch(i){case 0:e.index=t.trim();break;case 1:e.opacity=t.trim()}})},e.prototype.setColors=function(){this.colors=[{class:"bgc--secondary",hex:"#edd54f"},{class:"bgc--primary",hex:"#acded5"},{class:"bgc--tertiary",hex:"#f5795f"}]},__decorate([i.i(o.Input)("bgcModifier"),__metadata("design:type",Object)],e.prototype,"colorPar",void 0),e=__decorate([i.i(o.Directive)({selector:"[bgcModifier]"}),__metadata("design:paramtypes",[o.ElementRef])],e)}()},1020:function(e,t,i){"use strict";var o=i(1),s=i(257);i.d(t,"a",function(){return n});var n=function(){function e(e,t){this.window=t.nativeWindow,this.el=e.nativeElement,this.el.style.maxHeight=this.window.innerHeight/2}return e.prototype._resizeEventListiner=function(){this.el.style.maxHeight=this.window.innerHeight/2},__decorate([i.i(o.HostListener)("window:resize",["$event"]),__metadata("design:type",Function),__metadata("design:paramtypes",[]),__metadata("design:returntype",void 0)],e.prototype,"_resizeEventListiner",null),e=__decorate([i.i(o.Directive)({selector:"[halfPageHeight]",providers:[s.a]}),__metadata("design:paramtypes",[o.ElementRef,s.a])],e)}()},1021:function(e,t,i){"use strict";var o=i(1),s=i(257),n=i(258);i.n(n);i.d(t,"a",function(){return a});var a=function(){function e(e,t){this.window=t.nativeWindow,this.el=e.nativeElement,this.container=this.el.parentElement,this.imageRatio=this.el.innerWidth/this.el.innerHeight,this.containerRatio=this.container.innerWidth/this.container.innerHeight,this.observeImageLoadComplete()}return e.prototype.styleReset=function(){this.el.style.height="auto",this.el.style.width="auto",this.el.style.left="auto",this.el.style.top="auto",this.el.style.transform="none"},e.prototype.detectOrientation=function(){this.styleReset(),this.el.clientWidth>=this.el.clientHeight?this.orientation="horizontal":this.orientation="verticle"},e.prototype.imageCover=function(){this.detectOrientation(),"horizontal"==this.orientation&&this.widerThanParent()?(this.el.style.height="100%",this.el.style.width="auto",this.el.style.left="50%",this.el.style.transform="translateX(-50%)"):this.higherThanParent()&&(this.el.style.height="auto",this.el.style.width="100%",this.el.style.top="50%",this.el.style.transform="translateY(-50%)")},e.prototype._imageLoadComplete=function(){this.imageCover()},e.prototype._resizeEventListiner=function(){this.imageCover()},e.prototype.widerThanParent=function(){return this.el.clientWidth>this.el.parentNode.clientWidth},e.prototype.higherThanParent=function(){return this.el.clientHeight>this.el.parentNode.clientHeight},e.prototype.observeImageLoadComplete=function(){var e=this;this.observeLoaded$=n.Observable.fromEvent(this.el,"load"),this.loadSubscriber$=this.observeLoaded$.subscribe(function(t){e.imageCover(),e.loadSubscriber$.unsubscribe()})},e.prototype.ngOnInit=function(){this.el.style.zIndex=this.zIndex,this.imageCover()},__decorate([i.i(o.Input)("zIndex"),__metadata("design:type",Number)],e.prototype,"zIndex",void 0),__decorate([i.i(o.HostListener)("load",["evt"]),__metadata("design:type",Function),__metadata("design:paramtypes",[]),__metadata("design:returntype",void 0)],e.prototype,"_imageLoadComplete",null),__decorate([i.i(o.HostListener)("window:resize",["$event"]),__metadata("design:type",Function),__metadata("design:paramtypes",[]),__metadata("design:returntype",void 0)],e.prototype,"_resizeEventListiner",null),e=__decorate([i.i(o.Directive)({selector:"[imageCover]",providers:[s.a]}),__metadata("design:paramtypes",[o.ElementRef,s.a])],e)}()},1023:function(e,t,i){"use strict";var o=i(1),s=i(257);i.d(t,"a",function(){return n});var n=function(){function e(e,t){this.window=t.nativeWindow,this.el=e.nativeElement,this.delay=250}return e.prototype.onMouseEnter=function(e){this.top=this.el.offsetTop-this.window.scrollY,this.right=this.el.offsetLeft+this.el.offsetWidth,this.bottom=this.el.offsetTop-this.window.scrollY+this.el.offsetHeight,this.left=this.el.offsetLeft;var t=e.clientX-this.left,i=this.right-e.clientX,o=e.clientY-this.top,s=this.bottom-e.clientY,n=s<t&&s<i&&s<o,a=i<t&&i<s&&i<o,r=t<s&&t<i&&t<o;n?this.el.className+=" portfolio-item-in-bottom":a?this.el.className+=" portfolio-item-in-right":r?this.el.className+=" portfolio-item-in-left":this.el.className+=" portfolio-item-in-top"},e.prototype.onMouseLeave=function(e){var t=new RegExp("portfolio-item-in-[a-z]*");this.el.className="portfolio-item-hold "+this.el.className.replace(t,"").trim(),this.top=this.el.offsetTop-this.window.scrollY,this.right=this.el.offsetLeft+this.el.offsetWidth,this.bottom=this.el.offsetTop-this.window.scrollY+this.el.offsetHeight,this.left=this.el.offsetLeft;var i=this.left-e.clientX,o=e.clientX-this.right,s=this.top-e.clientY,n=e.clientY-this.bottom,a=n<i&&n<o&&n<s,r=o<i&&o<n&&o<s,l=i<n&&i<o&&i<s;a?this.el.className=this.el.className.replace("portfolio-item-hold","")+" portfolio-item-out-bottom":r?this.el.className=this.el.className.replace("portfolio-item-hold","")+" portfolio-item-out-right":l?this.el.className=this.el.className.replace("portfolio-item-hold","")+" portfolio-item-out-left":this.el.className=this.el.className.replace("portfolio-item-hold","")+" portfolio-item-out-top";var d=new RegExp("portfolio-item-out-[a-z]*"),c=this;setTimeout(function(){c.el.className=c.el.className.replace(d,"").trim()},this.delay)},__decorate([i.i(o.HostListener)("mouseenter",["$event"]),__metadata("design:type",Function),__metadata("design:paramtypes",[Object]),__metadata("design:returntype",void 0)],e.prototype,"onMouseEnter",null),__decorate([i.i(o.HostListener)("mouseleave",["$event"]),__metadata("design:type",Function),__metadata("design:paramtypes",[Object]),__metadata("design:returntype",void 0)],e.prototype,"onMouseLeave",null),e=__decorate([i.i(o.Directive)({selector:"[slideHover]",providers:[s.a]}),__metadata("design:paramtypes",[o.ElementRef,s.a])],e)}()},1035:function(e,t){e.exports='<section class="gw--no-guts">\n  <article *ngFor="let item of portfolio; let i = index" class="g g-palm-1/1 g-1/2 g-desk-wide-1/3">\n    <div slideHover halfPageHeight class="portfolio-item">\n      <div class="portfolio-item__inner">\n        <img imageCover (imageLoadComplete)="imageIsLoaded()" [zIndex]="5" class="portfolio-item__image" src="{{ item.img.url }}" alt="{{ item.img.alt }}">\n        <div bgcModifier="{{i}}, .9" class="portfolio-item__over">\n          <div class="portfolio-item__center">\n            <h2 class="portfolio-item__title">{{ item.title }}</h2>\n            <p class="portfolio-item__short" [innerHTML]="item.description"></p>\n            <a class="btn btn--base" target="_black" href="{{ item.link }}">\n            explore<span class="visuallyhidden"> website in embedded window</span>\n            </a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </article>\n</section>\n'},952:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(1),s=i(93),n=i(995),a=i(1014),r=i(996),l=i(1020),d=i(1023),c=i(1021),h=i(1019);i.d(t,"WhatModule",function(){return p});var p=function(){function e(){}return e=__decorate([i.i(o.NgModule)({imports:[a.a,s.b,a.a],declarations:[n.a,l.a,d.a,c.a,h.a],providers:[r.a]}),__metadata("design:paramtypes",[])],e)}()},995:function(e,t,i){"use strict";var o=i(1),s=i(996);i.d(t,"a",function(){return n});var n=function(){function e(e){this.whatService=e}return e.prototype.ngOnInit=function(){this.setPortfolio()},e.prototype.setPortfolio=function(){this.portfolio=this.whatService.getPortfolioItems()},e=__decorate([i.i(o.Component)({selector:"main",template:i(1035)}),__metadata("design:paramtypes",[s.a])],e)}()},996:function(e,t,i){"use strict";var o=i(1);i.d(t,"a",function(){return s});var s=function(){function e(){}return e.prototype.getPortfolioItems=function(){return[{img:{url:"http://dewwwald.com/assets/img/HS-shopfitter.jpg",alt:"dewwwald web development - hs-shopfitters website screenshot"},title:"H.S. Shopfitters",description:"Website built with ProcessWire and uses the scroll animation library called Skrollr to implement a curtain. <em>Designed by Fixate and coding done while employed there.</em>",link:"http://hsshopfitters.co.za/"},{img:{url:"http://dewwwald.com/assets/img/cafe-cazengo.jpg",alt:"dewwwald web development - Cafe Cazengo website screenshot"},title:"Cafe Cazengo",description:"Website built with ProcessWire. This project introduced me to working with svgs and modifying them with css. For this project I also had to do multilingual support. <em>Designed by Fixate and coding done while employed there.</em>",link:"http://cafecazengo.com/"},{img:{url:"http://dewwwald.com/assets/img/the-alter-native.jpg",alt:"dewwwald web development - The alter native website screenshot"},title:"The Alter Native",description:"This was the first website that I ever built under the guidance of my Fixate mentor, using ProcessWire as a CMS. <em>Designed by Fixate and coding done while employed there.</em>",link:"http://zanelemodiba.com/"},{img:{url:"http://dewwwald.com/assets/img/dare-to-explore.jpg",alt:"dewwwald web development - Dare to explore website screenshot"},title:"Dare To Explore",description:"One of my favourite websites I've worked on, also built with ProcessWire. This project stretched me with implementing my first ever web forms. <em>Designed by Fixate and coding done while employed there.</em>",link:"http://daretoexplore.co.za/"},{img:{url:"http://dewwwald.com/assets/img/monarchandco.jpg",alt:"dewwwald web development - Monarch and co website screenshot"},title:"Monarch & Co",description:"A project built on ProcessWire. During the course of this project I had to migrate a lot of data from Wordpress and create a multi-site, unfortunately that feature was never deployed. <em>Design by Fixate and coding done while employed there.</em>",link:"http://monarchandco.com/"},{img:{url:"http://dewwwald.com/assets/img/click-to-drive.jpg",alt:"dewwwald web development - Click to drive website screenshot"},title:"Click To Drive",description:"My first website working in a team. I focused on the front end development while my colleague focused on the back end. <em>Design by CubeZoo and coding done while employed there.</em>",link:"http://clicktodrive.co.za/"}]},e=__decorate([i.i(o.Injectable)(),__metadata("design:paramtypes",[])],e)}()}});