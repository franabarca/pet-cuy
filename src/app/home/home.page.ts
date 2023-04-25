import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
declare var google: { maps: { Map: new (arg0: any, arg1: { center: { lat: number; lng: number; }; zoom: number; }) => any; }; };

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
  IonicModule,
  RouterLink],
})
export class HomePage implements AfterViewInit {
  map: any;
  @ViewChild('mapElement', { static: false }) 
  mapElement!: { nativeElement: any; };
  mapOptions = {
    center: { lat: -33.0336720799213, lng: -71.53318205504011},
    zoom: 8,
  };

  constructor() {}
  
  loadMap(){
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions)
  }

  ngAfterViewInit(): void {
    this.loadMap();
      
  }
}
