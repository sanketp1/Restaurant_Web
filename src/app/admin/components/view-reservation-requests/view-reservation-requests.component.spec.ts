import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReservationRequestsComponent } from './view-reservation-requests.component';

describe('ViewReservationRequestsComponent', () => {
  let component: ViewReservationRequestsComponent;
  let fixture: ComponentFixture<ViewReservationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReservationRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReservationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
