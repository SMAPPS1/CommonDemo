import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidinvoiceComponent } from './invalidinvoice.component';

describe('InvalidinvoiceComponent', () => {
  let component: InvalidinvoiceComponent;
  let fixture: ComponentFixture<InvalidinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
