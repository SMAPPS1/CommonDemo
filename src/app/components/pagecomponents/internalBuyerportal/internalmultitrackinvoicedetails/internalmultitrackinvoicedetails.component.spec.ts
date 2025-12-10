import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalmultitrackinvoicedetailsComponent } from './internalmultitrackinvoicedetails.component';

describe('InternalmultitrackinvoicedetailsComponent', () => {
  let component: InternalmultitrackinvoicedetailsComponent;
  let fixture: ComponentFixture<InternalmultitrackinvoicedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalmultitrackinvoicedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalmultitrackinvoicedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
