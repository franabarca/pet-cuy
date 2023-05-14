import { Routes } from '@angular/router';
import { EditarPerfilComponent } from './menu/editar-perfil/editar-perfil.component';
import { VerPerfilComponent } from './menu/ver-perfil/ver-perfil.component';
import { EncontreMascotaComponent } from './home/encontre-mascota/encontre-mascota.component';
import { PerdiMascotaComponent } from './home/perdi-mascota/perdi-mascota.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { LoggedInGuard } from './logged-in.guard';
import { CambiarContrasenaComponent } from './menu/cambiar-contrasena/cambiar-contrasena.component';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./inicio-sesion/login/login.page').then( m => m.LoginPage),
    canActivate: [LoggedInGuard]
  },
  {
    path: 'registro',
    loadComponent: () => import('./inicio-sesion/registro/registro.page').then( m => m.RegistroPage),
    canActivate: [LoggedInGuard]
  },
  {
    path: 'contrasena',
    loadComponent: () => import('./inicio-sesion/olvide-contrasena/olvide-contrasena.page').then( m => m.OlvideContrasenaPage),
    canActivate: [LoggedInGuard]
  },
  {
    path: 'modalpopup',
    loadComponent: () => import('./modalpopup/modalpopup.page').then( m => m.ModalpopupPage),
    canActivate: [LoggedInGuard]
  },
  {
    path: 'perdi-mascota', component: PerdiMascotaComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'encontre-mascota', component: EncontreMascotaComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'editar-perfil', component: EditarPerfilComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'ver-perfil', component: VerPerfilComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: 'cambiar-contrasena', component: CambiarContrasenaComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  

  

 

];
