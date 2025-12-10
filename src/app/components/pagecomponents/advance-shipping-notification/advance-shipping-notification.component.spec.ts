import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceShippingNotificationComponent } from './advance-shipping-notification.component';

describe('AdvanceShippingNotificationComponent', () => {
  let component: AdvanceShippingNotificationComponent;
  let fixture: ComponentFixture<AdvanceShippingNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceShippingNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceShippingNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
