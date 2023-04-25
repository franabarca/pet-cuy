import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perdi-mascota',
  templateUrl: './perdi-mascota.component.html',
  styleUrls: ['./perdi-mascota.component.scss'],
})
export class PerdiMascotaComponent  implements OnInit {

  constructor(private router: Router, public alertController: AlertController) { }

  ngOnInit() {}

  ingresar(){
    this.presentAlert('','Mascota Ingresada Correctamente');
    this.router.navigate(['/home']);
  }


  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();

  }
}
