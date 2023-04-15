import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login/login.page';
import { OlvidoContrasenaComponent } from './olvido-contrasena/olvido-contrasena.component';



@NgModule({
  declarations: [

    OlvidoContrasenaComponent
  ],
  imports: [
    CommonModule,
    LoginPage,
    
  ]
})
export class InicioSesionModule { 
  showMenu: boolean = true;
  ionViewDidEnter() {
    this.showMenu = false;
  }

}

