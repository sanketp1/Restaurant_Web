import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from 'src/app/admin/admin-services/admin.service';
import { CustomerService } from '../../customer-services/customer.service';

@Component({
  selector: 'app-my-reservation-requests',
  templateUrl: './my-reservation-requests.component.html',
  styleUrls: ['./my-reservation-requests.component.scss']
})
export class MyReservationRequestsComponent implements OnInit {

  reservations: any
  size: NzButtonSize = 'large';
  validateForm!: FormGroup;
  isSpinning: boolean;

  constructor(private customerService: CustomerService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getAllReservationsRequest();
  }

  getAllReservationsRequest() {
    this.customerService.getAllReservationsRequests().subscribe((res) => {
      console.log(res)
      this.reservations = res;
    })
  }

}

