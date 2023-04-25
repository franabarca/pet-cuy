import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { OlvideContrasenaPage } from './olvide-contrasena.page';

describe('OlvideContrasenaPage', () => {
  let component: OlvideContrasenaPage;
  let fixture: ComponentFixture<OlvideContrasenaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OlvideContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
