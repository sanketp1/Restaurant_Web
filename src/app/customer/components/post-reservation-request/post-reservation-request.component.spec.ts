import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReservationRequestComponent } from './post-reservation-request.component';

describe('PostReservationRequestComponent', () => {
  let component: PostReservationRequestComponent;
  let fixture: ComponentFixture<PostReservationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostReservationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReservationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
