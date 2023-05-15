import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ModalpopupPage } from './modalpopup.page';

describe('ModalpopupPage', () => {
  let component: ModalpopupPage;
  let fixture: ComponentFixture<ModalpopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
