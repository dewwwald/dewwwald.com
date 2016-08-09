import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {
  GOOGLE_MAPS_DIRECTIVES,
  GOOGLE_MAPS_PROVIDERS,
  SebmGoogleMapCircle,
  SebmGoogleMap,
  CircleManager,
  GoogleMapsAPIWrapper,
  provideLazyMapsAPILoaderConfig
} from 'angular2-google-maps/core';

import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { MainContentComponent } from '../../shared/main-content/main-content.component';
import { FullPageDirective } from '../../shared/directives/full-page.directive';
import { WindowService } from '../../shared/services/window.service';

@Component({
  selector: 'main',
  templateUrl: 'app/components/when/when.component.html',
  providers: [
    WindowService,
    GOOGLE_MAPS_PROVIDERS,
    GoogleMapsAPIWrapper,
    CircleManager,
    provideLazyMapsAPILoaderConfig({
      apiKey: 'AIzaSyAOtb8zwoH5NoGfsPBCLpW9pByUnWSGHVw'
    })
  ],
  directives: [
    GOOGLE_MAPS_DIRECTIVES,
    SebmGoogleMap,
    SebmGoogleMapCircle,
    ROUTER_DIRECTIVES,
    FullPageDirective,
    SidebarComponent,
    MainContentComponent
  ]
})
export class WhenComponent {
  lat: number = -26.1;
  lng: number = 28.1;
  mapStyles;

  ngOnInit ()
  {
    this.mapStyles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
  }

  constructor () {}
}
