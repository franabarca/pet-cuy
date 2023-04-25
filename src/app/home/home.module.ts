import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerdiMascotaComponent } from './perdi-mascota/perdi-mascota.component';
import { EncontreMascotaComponent } from './encontre-mascota/encontre-mascota.component';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [
    PerdiMascotaComponent,
    EncontreMascotaComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    IonicModule
  ]
})
export class HomeModule { }
