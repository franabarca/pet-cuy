import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';



@NgModule({
  declarations: [
    VerPerfilComponent,
    EditarPerfilComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MenuModule { }
