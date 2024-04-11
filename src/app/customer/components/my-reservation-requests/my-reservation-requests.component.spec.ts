import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReservationRequestsComponent } from './my-reservation-requests.component';

describe('MyReservationRequestsComponent', () => {
  let component: MyReservationRequestsComponent;
  let fixture: ComponentFixture<MyReservationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReservationRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReservationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
