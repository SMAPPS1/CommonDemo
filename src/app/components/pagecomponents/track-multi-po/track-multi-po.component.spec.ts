import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMultiPoComponent } from './track-multi-po.component';

describe('TrackMultiPoComponent', () => {
  let component: TrackMultiPoComponent;
  let fixture: ComponentFixture<TrackMultiPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackMultiPoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackMultiPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
