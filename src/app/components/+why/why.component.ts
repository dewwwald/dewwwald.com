import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './why.component.html',
})
export class WhyComponent {
  constructor () {
    ga('set', 'page', '/why');
    ga('send', 'pageview');
  }
}
