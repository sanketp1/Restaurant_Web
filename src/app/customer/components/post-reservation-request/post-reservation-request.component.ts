import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../customer-services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-reservation-request',
  templateUrl: './post-reservation-request.component.html',
  styleUrls: ['./post-reservation-request.component.scss']
})
export class PostReservationRequestComponent implements OnInit {

  TableType: string[] = [
    "Standard Table",
    "Booth",
    "Communal Table",
    "Bar Table",
    "Outdoor Table",
    "High-top Table",
    "Banquette",
    "Chef's Table",
    "Convertible Table",
    "Corner Table",
    "Family-Style Table",
    "Window-side Table",
    "Private Dining Table",
    "Lounge Table",
    "Round Table",
    "Custom Table"
  ];

  validateForm!: FormGroup;
  isSpinning = false;

  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      tableType: [null, [Validators.required]],
      description: [null, [Validators.required]],
      reservationDate: [null, [Validators.required]],
      dateTime: [null, Validators.required],
    });
  }

  submitForm(): void {
    this.isSpinning = true;
    this.customerService.postReservationRequest(this.validateForm.value).subscribe((res) => {
      this.isSpinning = false;
      if (res.id != null) {
        this.message.success(`Reservation Requested Successfully.`, { nzDuration: 5000 });
        this.router.navigateByUrl('/customer/dashboard');
      } else {
        this.message.error(`${res.message}`, { nzDuration: 5000 });
      }
    });
  }


}
