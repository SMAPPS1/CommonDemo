import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAprovalInternaltrackinvoicewithPOComponent } from './mobile-aproval-internaltrackinvoicewith-po.component';

describe('MobileAprovalInternaltrackinvoicewithPOComponent', () => {
  let component: MobileAprovalInternaltrackinvoicewithPOComponent;
  let fixture: ComponentFixture<MobileAprovalInternaltrackinvoicewithPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAprovalInternaltrackinvoicewithPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAprovalInternaltrackinvoicewithPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
