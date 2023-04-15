import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private mostrarMenuSubject = new BehaviorSubject<boolean>(true);
  mostrarMenu$ = this.mostrarMenuSubject.asObservable();

  constructor() { }

  mostrarMenu(): void {
    this.mostrarMenuSubject.next(true);
  }

  ocultarMenu(): void {
    this.mostrarMenuSubject.next(false);
  }
}
