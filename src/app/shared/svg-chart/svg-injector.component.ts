import {
  Component, ViewChild, Input, ViewContainerRef, ViewRef,
  Type, ComponentFactoryResolver, Compiler, ComponentRef
} from '@angular/core';

import { SvgHoldingComponet } from './svg-holding.component';

@Component({
  selector: 'svg-dynamic',
  template: ``
  // template: `<div #target></div>`
})
export class SvgDynamicComponent {
  // @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;
  // @Input() innerHtml: Type<Component>;
  // private isViewInitialized:boolean = false;
  // cmpRef: ComponentRef<Component>;
  // private compiler: Compiler;
  // private componentFactoryResolver: ComponentFactoryResolver;

  // constructor(componentFactoryResolver: ComponentFactoryResolver, compiler: Compiler) {
  //   this.compiler = compiler;
  //   this.componentFactoryResolver = componentFactoryResolver;
  // }

  // updateComponent() {
  //   if(!this.isViewInitialized) {
  //     return;
  //   }
  //   if(this.cmpRef) {
  //     this.cmpRef.destroy();
  //   }

  //   let factory = this.componentFactoryResolver.resolveComponentFactory(this.innerHtml);
  //   this.cmpRef = this.target.createComponent(factory)
  // }

  // ngOnChanges() {
  //   this.updateComponent();
  // }

  // ngAfterViewInit() {
  //   this.isViewInitialized = true;
  //   this.updateComponent();
  // }

  // ngOnDestroy() {
  //   if(this.cmpRef) {
  //     this.cmpRef.destroy();
  //   }
  // }
}
