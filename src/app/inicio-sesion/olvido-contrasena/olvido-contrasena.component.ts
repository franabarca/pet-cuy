import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-olvido-contrasena',
  templateUrl: './olvido-contrasena.component.html',
  styleUrls: ['./olvido-contrasena.component.scss'],
})
export class OlvidoContrasenaComponent  implements OnInit {

  constructor() { }
  showMenu: boolean = true;
  ionViewDidEnter() {
    this.showMenu = false;
  }
  ngOnInit() {
    
  }

}
