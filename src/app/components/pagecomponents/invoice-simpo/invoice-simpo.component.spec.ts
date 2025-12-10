import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSimpoComponent } from './invoice-simpo.component';

describe('InvoiceSimpoComponent', () => {
  let component: InvoiceSimpoComponent;
  let fixture: ComponentFixture<InvoiceSimpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceSimpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSimpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
