import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidatorFn , FormControl, FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, } from '@angular/forms';
import { IonicModule, AlertController  } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
    RouterLink, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  forgotForm = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9), Validators.pattern('[0-9A-Za-z]+'), this.rutValidator()]),
    password: new FormControl('')
  });
  
  getErrorMessage(controlName: string) {
    const control = this.forgotForm.get(controlName);
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
    return '';
  }

  constructor(private router: Router, public alertController:AlertController, public formBuilder:FormBuilder, private http: HttpClient) {}

  ngOnInit() {
  }



  submitForm() {
    if (this.forgotForm && this.forgotForm.valid) {
      const rutControl = this.forgotForm.get('rut');
      const passwordControl = this.forgotForm.get('password');
      if (rutControl && passwordControl) {
        const rut = rutControl.value;
        const password = passwordControl.value;
        console.log(rut)
        console.log(password)
        const requestBody = { rut: rut , contrasena: password };
        this.http.post('https://luyinq.pythonanywhere.com/login/', requestBody)
          .subscribe((response: any) => {
            if (response.success) {
              localStorage.setItem('loginResponse', JSON.stringify(response));
              this.presentAlert("Felicitaciones", response.message);
              this.router.navigate(['/home']);
              const loginResponseString = localStorage.getItem('loginResponse');
              if (loginResponseString) {
                const loginResponse = JSON.parse(loginResponseString);
                if (loginResponse.success) {
                  const tokens = loginResponse.data.tokens;
                  if (tokens && tokens.length > 0) {
                    const tokenKey = tokens[0]['key'];
                    console.log(tokenKey);
                    
                  }
                }
              }
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
