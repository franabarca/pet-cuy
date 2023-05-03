import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

declare var google: { maps: {
  Geocoder: any;
  Marker: any; Map: new (arg0: any, arg1: { center: { lat: number; lng: number; }; zoom: number; }) => any; 
}; };

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
  @ViewChild('mapElement', { static: false }) mapElement!: { nativeElement: any; };
  mapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 8,
  };

  address: any;

  constructor(private main: AppComponent, private geolocation: Geolocation) {
    const nombre = localStorage.getItem('nombre');
    this.main.nombre = nombre !== null ? nombre : '';
  }
  
  loadMap(){
    console.log('LLEGUE AQUI')
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    const marker = new google.maps.Marker({
      position: this.mapOptions.center,
      map: this.map,
      title: 'Ubicación Actual',
    });
    this.geocodeLatLng(this.mapOptions.center);
  }

  geocodeLatLng(currentPosition: { lat: number; lng: number; }) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: currentPosition }, (results: any[], status: string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.map.setZoom(5);
          const marker = new google.maps.Marker({
            position: currentPosition,
            map: this.map,
          });
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder fallo debido a:" + status);
      }
    });
  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.mapOptions.center.lat = resp.coords.latitude;
      this.mapOptions.center.lng = resp.coords.longitude;
      this.loadMap();
    }).catch((error) => {
      console.log('ERROR TRATANDO DE OBTENER LA GEOLOCALIZACION', error)
    });
  }
}
