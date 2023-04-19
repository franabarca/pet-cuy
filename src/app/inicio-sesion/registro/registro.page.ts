import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { MenuService } from '../../menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistroPage implements OnInit {

  constructor(private menuService: MenuService, private router: Router, public alertController: AlertController) {}

  ionViewDidEnter() {
    this.menuService.ocultarMenu();
  }
  ngOnInit() {
    
  }

  inicioSesion(){
    this.presentAlert("Felicidades!","Registro Completado");
    this.router.navigate(['/login']);
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
