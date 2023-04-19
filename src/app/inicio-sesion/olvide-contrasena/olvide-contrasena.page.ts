import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { MenuService } from 'src/app/menu.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-olvide-contrasena',
  templateUrl: './olvide-contrasena.page.html',
  styleUrls: ['./olvide-contrasena.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class OlvideContrasenaPage implements OnInit {

  correoForm: FormGroup;
  isSubmitted= false;

  constructor(private menuService:MenuService, private router:Router, public alertController:AlertController, public formBuilder:FormBuilder) { }
  ionViewDidEnter() {
    this.menuService.ocultarMenu();
  }
  ngOnInit() {
    
  }

  get errorControl() {
    return this.correoForm.controls;
  }

  submitForm() {
    
      this.presentAlert("Felicitaciones","Se a enviado un correo a tu email para reestablecer tu contraseña");
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
