import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTrackinvoicewithMultiPOComponent } from './internal-trackinvoicewith-multi-po.component';

describe('InternalTrackinvoicewithMultiPOComponent', () => {
  let component: InternalTrackinvoicewithMultiPOComponent;
  let fixture: ComponentFixture<InternalTrackinvoicewithMultiPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalTrackinvoicewithMultiPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTrackinvoicewithMultiPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
