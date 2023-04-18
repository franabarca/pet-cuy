import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistroPage implements OnInit {

  constructor(private menuService: MenuService) {}

  ionViewDidEnter() {
    this.menuService.ocultarMenu();
  }
  ngOnInit() {
  }

}
