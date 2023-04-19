import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})

export class EditarPerfilComponent  implements OnInit {

  constructor(private router: Router, public alertController: AlertController) { }

  ngOnInit() {}

  guardar(){
    this.presentAlert('Guardar Cambios','Cambios Guardardados');
    this.router.navigate(['/ver-perfil']);
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
