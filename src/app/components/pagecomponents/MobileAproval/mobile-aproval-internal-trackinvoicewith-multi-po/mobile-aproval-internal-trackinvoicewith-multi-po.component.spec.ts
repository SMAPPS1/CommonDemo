import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAprovalInternalTrackinvoicewithMultiPOComponent } from './mobile-aproval-internal-trackinvoicewith-multi-po.component';

describe('MobileAprovalInternalTrackinvoicewithMultiPOComponent', () => {
  let component: MobileAprovalInternalTrackinvoicewithMultiPOComponent;
  let fixture: ComponentFixture<MobileAprovalInternalTrackinvoicewithMultiPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAprovalInternalTrackinvoicewithMultiPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAprovalInternalTrackinvoicewithMultiPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
