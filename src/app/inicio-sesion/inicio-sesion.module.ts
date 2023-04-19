import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login/login.page';




@NgModule({
  declarations: [

  
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

