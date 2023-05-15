import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';


declare var google: { maps: {
  event: any;
  Geocoder: any;
  Marker: any; Map: new (arg0: any, arg1: { center: { lat: number; lng: number; }; zoom: number; }) => any; 
}; };

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ModalpopupPage implements AfterViewInit {

  map: any;
  marker: any;

  @ViewChild('mapElement', { static: false }) mapElement!: { nativeElement: any; };

  mapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 50,
    fullscreenControl: true,
    mapTypeControl: false,
    styles: [
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#73C8FA'
          }
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#F2F2F2'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#85A2BF'
          },
          {
            weight: 1.5
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#D8E6F3'
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#9EB6C8'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#F2F2F2',
            visibility: "off"
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#D9D9D9'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#F2F2F2'
          }
        ]
      }
    ]
  };

  address: any;
  iconImage = '/assets/imagenes/ubicacionicono.png';

  constructor(private modalController: ModalController, private geolocation: Geolocation) {
    const nombre = localStorage.getItem('nombre');
   }

   loadMap(){
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    this.map.setZoom(15);
    const marker = new google.maps.Marker({
      position: this.mapOptions.center,
      map: this.map,
      icon: this.iconImage,
      draggable: true // hace el marcador draggable
    });

    marker.addListener('dragend', (event: any) => {
      console.log('latitud: ', event.latLng.lat());
      console.log('longitud: ', event.latLng.lng());
    });

    this.geocodeLatLng(this.mapOptions.center);

  }

  geocodeLatLng(currentPosition: { lat: number; lng: number; }) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: currentPosition }, (results: any[], status: string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.map.setZoom(17);
          this.marker.setPosition(currentPosition);
        } else {
          window.alert("No se encontraron resultados");
        }
      } else {
        window.alert("El geocodificador falló debido a: " + status);
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

  ngOnInit() {
  }

  CloseModal(){
    this.modalController.dismiss();
  }

}
