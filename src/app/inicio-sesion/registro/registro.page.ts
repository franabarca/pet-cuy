import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  registerForm: FormGroup;
  isSubmitted = false;

  constructor(private menuService: MenuService, private router: Router, public formBuilder: FormBuilder) {}

  ionViewDidEnter() {
    this.menuService.ocultarMenu();
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      rut: ['', [Validators.required, Validators.pattern('[a-z]'), Validators.maxLength(8)], Validators.minLength(8)],
      nombre: ['', [Validators.required, Validators.pattern('[a-z]')]],
      apellido: ['', [Validators.required, Validators.pattern('[a-z]')]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9]+.+[a-z]')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get errorControl(){
    return this.registerForm.controls;
  }

  InicioSesion(){
    this.router.navigate(['/login']);
  }

  submitForm(){
    this.isSubmitted = true;

    if (!this.registerForm.valid){
      console.log("")
      return false;

    }else{
      console.log(this.registerForm.value)
      this.router.navigate(['/login']);
      return;
    }


  }

}
