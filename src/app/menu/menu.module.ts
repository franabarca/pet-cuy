import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, EmailValidator, FormBuilder, FormControl, FormGroup, FormsModule, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [],
  imports: [
  ]
})

export class MenuModule   implements OnInit {

  registerForm: FormGroup;
  dataRut: string;

  constructor( private router: Router, 
    public alertController: AlertController, 
    public fb:FormBuilder, 
    private http: HttpClient) { }


  getUserData() {
    const loginResponseString = localStorage.getItem('loginResponse');
    if (loginResponseString) {
      const loginResponse = JSON.parse(loginResponseString);
      if (loginResponse.success) {
        const data = loginResponse.data.usuario;
        if (data) {
          this.dataRut = data[0]['rut']; // Asignar el valor a la propiedad global dataRut
          console.log(this.dataRut);
          this.http.get('https://luyinq.pythonanywhere.com/usuario/' + this.dataRut)
            .subscribe((response: any) => {
              if (response.success) {
                const userData = response.data;
                this.registerForm.setValue({
                  rut: userData.rut,
                  nombre: userData.nombre,
                  apellido: userData.apellido,
                  password: '',
                  confirmPassword: '',
                  email: userData.correo,
                  celular: userData.celular
                });
              } else {
                this.presentAlert("Error", response.message);
              }
            }, (error: any) => {
              console.error(error);
              this.presentAlert("Error", error.error.message);
            });
        }
      }
    }
  }

  ngOnInit() { this.registerForm = this.fb.group({
    rut: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9), Validators.pattern('[0-9A-Za-z]+'), this.rutValidator()]),
    nombre: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    apellido: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20),]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20),]),
    email: new FormControl('',[Validators.required]),
    celular: new FormControl('',[Validators.required])
  });

  this.getUserData();}
  
  submitForm() {
    if (this.registerForm && this.registerForm.valid) {
      const rutControl = this.registerForm.get('rut');
      const nomControl = this.registerForm.get('nombre');
      const apeControl = this.registerForm.get('apellido');
      const passControl = this.registerForm.get('password');
      const emailControl = this.registerForm.get('email');
      const celControl = this.registerForm.get('celular');
      if (rutControl && nomControl && apeControl && emailControl && celControl ) {
        const rut = rutControl.value;
        const nombre = nomControl.value;
        const apellido = apeControl.value;
        const email = emailControl.value;
        const celular = celControl.value;
      
        
        this.http.post(this.dataRut, {
          rut: rut,
          nombre: nombre,
          apellido: apellido,
          email: email,
          celular: celular
        })
        .subscribe(response => {
          // Se ejecuta cuando la petición se completa exitosamente
          console.log(response);
        }, error => {
          // Se ejecuta cuando ocurre un error en la petición
          console.log(error);
        });
      }}}

  rutValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const rut = control.value;
      if (!rut) {
        return null;
      }
      const isValid = this.validarRut(rut);
      return isValid ? null : { 'invalidRut': true };
    };
  }

  validarRut(rut: string): boolean {
    rut = rut.toUpperCase();
    rut = rut.replace("-", "");
    rut = rut.replace(".", "");
    const aux = rut.slice(0,-1);
    let dv: string = rut.slice(-1);
  
    if (dv === 'K') {
      dv = '10';
    } else if (!dv.match(/^\d+$/)) {
      return false;
    }
  
    if (!aux.match(/^\d+$/)) {
      return false;
    }
  
    const revertido = Array.from(aux, Number).reverse();
    const factors = [2, 3, 4, 5, 6, 7];
    let s = 0;
    let f = 0;
  
    for (let i = 0; i < revertido.length; i++) {
      f = factors[i % factors.length];
      s += revertido[i] * f;
    }
  
    let res = (11 - (s % 11)).toString();
    
    if (res === '11') {
      res = '0';
    }
  
    if (res === dv) {
      return true;
    } else {
      return false;
    }
  }
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
