import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InertnalLoginComponent } from './inertnal-login.component';

describe('InertnalLoginComponent', () => {
  let component: InertnalLoginComponent;
  let fixture: ComponentFixture<InertnalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InertnalLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InertnalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
