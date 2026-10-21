import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAprovalComponent } from './invoice-aproval.component';

describe('InvoiceAprovalComponent', () => {
  let component: InvoiceAprovalComponent;
  let fixture: ComponentFixture<InvoiceAprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceAprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
