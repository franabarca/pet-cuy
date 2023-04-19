import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuModule } from './menu/menu.module';
import { RouterLink } from '@angular/router';
import { InicioSesionModule } from './inicio-sesion/inicio-sesion.module';
import { HomeModule } from './home/home.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    MenuModule,
    RouterLink,
    InicioSesionModule,
    HomeModule,
    CommonModule,
  ],
})
export class AppComponent {
  constructor() {

  }


}
