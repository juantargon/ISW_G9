import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoAdheridoComponent } from './pago-adherido.component';

describe('PagoAdheridoComponent', () => {
  let component: PagoAdheridoComponent;
  let fixture: ComponentFixture<PagoAdheridoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoAdheridoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoAdheridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
