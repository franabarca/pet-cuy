import { Routes } from '@angular/router';
import { EditarPerfilComponent } from './menu/editar-perfil/editar-perfil.component';
import { VerPerfilComponent } from './menu/ver-perfil/ver-perfil.component';
import { OlvidoContrasenaComponent } from './inicio-sesion/olvido-contrasena/olvido-contrasena.component';
import { EncontreMascotaComponent } from './home/encontre-mascota/encontre-mascota.component';
import { PerdiMascotaComponent } from './home/perdi-mascota/perdi-mascota.component';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./inicio-sesion/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'olvido-contrasena', component: OlvidoContrasenaComponent
  },
  {
    path: 'perdi-mascota', component: PerdiMascotaComponent
  },
  {
    path: 'encontre-mascota', component: EncontreMascotaComponent
  },
  {
    path: 'editar-perfil', component: EditarPerfilComponent
  },
  {
    path: 'ver-perfil', component: VerPerfilComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
 

];
