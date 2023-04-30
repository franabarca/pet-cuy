import { Component, OnInit, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, EmailValidator, FormBuilder, FormControl, FormGroup, FormsModule, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, AlertController, IonInput } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistroPage implements OnInit {

  /*VALIDAR FORM REGISTRO*/
  registerForm: FormGroup;
  show = false;

  getErrorMessage(controlName: string) {
    const control = this.registerForm.get(controlName);
    if (control?.hasError('required')) {
      return 'El campo es requerido.';
    }
    if (control?.hasError('minlength')) {
      return `El campo debe tener al menos ${control?.errors?.['minlength']?.requiredLength} caracteres.`;
    }
    if (control?.hasError('maxlength')) {
      return `El campo no puede tener más de ${control?.errors?.['maxlength']?.requiredLength} caracteres.`;
    }
    if (control?.hasError('pattern')) {
      return 'El campo solo puede contener letras y números.';
    }
    if (control?.hasError('invalidRut')) {
      return 'Debe ingresar un rut real.';
    }
    if (control?.hasError('not_matching')) {
      return 'Las contraseñas deben coincidir!';
    }
    return '';
  }

  constructor( private router: Router, public alertController: AlertController, public fb:FormBuilder, private http: HttpClient) {}


  ngOnInit() {
    this.registerForm = this.fb.group({
      rut: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9), Validators.pattern('[0-9A-Za-z]+'), this.rutValidator()]),
      nombre: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      apellido: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20),]),
      email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      celular: new FormControl('',[Validators.required, Validators.pattern("^(9)?[0-9]{9}$")])
  },
  {
    validator: this.matchingPasswords
  });
  }

  showPassword(){
    this.show = !this.show;
  }

  matchingPasswords(control: AbstractControl){
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    const currentErrors = control.get('confirmPassword')?.errors
    const confirmControl = control.get('confirmPassword')

    if(compare(password, confirmPassword)){
      confirmControl?.setErrors({...currentErrors, not_matching: true});
    }
  }
  
  submitForm() {
    if (this.registerForm && this.registerForm.valid) {
      const rutControl = this.registerForm.get('rut');
      const nomControl = this.registerForm.get('nombre');
      const apeControl = this.registerForm.get('apellido');
      const passControl = this.registerForm.get('password');
      const emailControl = this.registerForm.get('email');
      const celControl = this.registerForm.get('celular');
      if (rutControl && nomControl && apeControl && passControl && emailControl && celControl ) {
        const rut = rutControl.value;
        const nombre = nomControl.value;
        const apellido = apeControl.value;
        const password = passControl.value;
        const email = emailControl.value;
        const celular = celControl.value;
        const requestBody = 
        { 
          rut: rut,
          nombre: nombre,
          apellido: apellido,
          contrasena: password,
          correo: email,
          celular: celular
        };
        this.http.post('https://luyinq.pythonanywhere.com/usuario/', requestBody)
          .subscribe((response: any) => {
            if (response.success) {
              this.presentAlert("Felicitaciones", response.message);
              this.router.navigate(['/login']);
            } else {
              this.presentAlert("Error", response.message);
            }
          }, (error: any) => {
            console.error(error);
            this.presentAlert("Error", error.error.message);
          });
      }
    } else {
      this.presentAlert("Error", "Completa correctamente los campos.");
    }
  }



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

  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();

  }
}

function compare(password: string, confirmPassword: string) {
  return password !== confirmPassword && confirmPassword !== ''
}

