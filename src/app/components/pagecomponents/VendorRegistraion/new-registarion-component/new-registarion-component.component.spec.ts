import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegistarionComponentComponent } from './new-registarion-component.component';

describe('NewRegistarionComponentComponent', () => {
  let component: NewRegistarionComponentComponent;
  let fixture: ComponentFixture<NewRegistarionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRegistarionComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegistarionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
