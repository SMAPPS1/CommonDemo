import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalInvalidInvoiceComponent } from './internal-invalid-invoice.component';

describe('InternalInvalidInvoiceComponent', () => {
  let component: InternalInvalidInvoiceComponent;
  let fixture: ComponentFixture<InternalInvalidInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalInvalidInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalInvalidInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
