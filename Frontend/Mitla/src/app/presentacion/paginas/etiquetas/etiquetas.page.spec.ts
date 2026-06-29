import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtiquetasPage } from './etiquetas.page';

describe('EtiquetasPage', () => {
  let component: EtiquetasPage;
  let fixture: ComponentFixture<EtiquetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
