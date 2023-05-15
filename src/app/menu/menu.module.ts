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
  ],
  providers:[]
})

export class MenuModule {

  registerForm: FormGroup;
  dataRut: string;

  constructor( private router: Router, 
    public alertController: AlertController, 
    public fb:FormBuilder, 
    private http: HttpClient) { }
}
