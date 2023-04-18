import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login/login.page';
import { OlvidoContrasenaComponent } from './olvido-contrasena/olvido-contrasena.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [

    OlvidoContrasenaComponent
  ],
  imports: [
    CommonModule,
    LoginPage,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ]
})
export class InicioSesionModule { 
  showMenu: boolean = true;
  ionViewDidEnter() {
    this.showMenu = false;
  }

}

