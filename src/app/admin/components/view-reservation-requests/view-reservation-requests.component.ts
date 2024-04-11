import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-reservation-requests',
  templateUrl: './view-reservation-requests.component.html',
  styleUrls: ['./view-reservation-requests.component.scss']
})
export class ViewReservationRequestsComponent implements OnInit {

  reservations: any
  size: NzButtonSize = 'large';
  validateForm!: FormGroup;
  isSpinning: boolean;

  constructor(private adminService: AdminService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.getAllReservationsRequest();
  }

  getAllReservationsRequest() {
    this.adminService.getAllReservationsRequest().subscribe((res) => {
      console.log(res)
      this.reservations = res;
    })
  }

  changeReservationStatus(reservationId: number, status: string) {
    this.isSpinning = true;
    this.adminService.changeReservationStatus(reservationId, status).subscribe((res) => {
      this.isSpinning = false;
      if (res.id != null) {
        this.getAllReservationsRequest();
        this.message
          .success(
            `Reservation status changed successfully.`,
            { nzDuration: 5000 }
          );
      } else {
        this.message
          .error(
            `${res.message}`,
            { nzDuration: 5000 }
          )
      }
    })
  }

}
