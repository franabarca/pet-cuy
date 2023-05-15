import { Component, Injectable, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuModule } from './menu/menu.module';
import { RouterLink } from '@angular/router';
import { InicioSesionModule } from './inicio-sesion/inicio-sesion.module';
import { HomeModule } from './home/home.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './shared/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalpopupPage} from '../app/modalpopup/modalpopup.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [ApiService, Geolocation],
  standalone: true,
  imports: [
    IonicModule, 
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    RouterLink,
    InicioSesionModule,
    HomeModule,
    CommonModule,
    HttpClientModule,
    ModalpopupPage
  ],
})

export class AppComponent implements OnInit {
  localStorage: Storage;
  showMenu: boolean = false;
  showAdminOptions: boolean = false;
  nombre: string;

  constructor(private router: Router, private api: ApiService)
  { }
  
  ngOnInit() {
    this.localStorage = window.localStorage;
    this.showMenu = !!this.localStorage.getItem('rut'); // Asigna el valor inicial de la variable showMenu
  }
  toggleAdminOptions() {
    this.showAdminOptions = !this.showAdminOptions;
  }

  logout() {
    this.localStorage.clear()
    this.showMenu = false; // Actualiza el valor de la variable showMenu
    window.location.reload();
  }



}
