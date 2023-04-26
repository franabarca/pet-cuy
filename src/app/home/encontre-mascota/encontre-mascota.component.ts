import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-encontre-mascota',
  templateUrl: './encontre-mascota.component.html',
  styleUrls: ['./encontre-mascota.component.scss'],
})
export class EncontreMascotaComponent  implements OnInit {

  constructor(private router: Router, public alertController: AlertController) { }

  ngOnInit() {}

  ingresar(){
    this.presentAlert('Mascota Encontrada!','Te contactaremos a la brevedad');
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
