import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTrackPODEtailsComponent } from './multi-track-podetails.component';

describe('MultiTrackPODEtailsComponent', () => {
  let component: MultiTrackPODEtailsComponent;
  let fixture: ComponentFixture<MultiTrackPODEtailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiTrackPODEtailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTrackPODEtailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
