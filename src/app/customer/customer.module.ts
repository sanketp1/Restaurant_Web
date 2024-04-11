import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { PostReservationRequestComponent } from './components/post-reservation-request/post-reservation-request.component';
import { MyReservationRequestsComponent } from './components/my-reservation-requests/my-reservation-requests.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ViewProductComponent,
    PostReservationRequestComponent,
    MyReservationRequestsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DemoNgZorroAntdModule
  ]
})
export class CustomerModule { }
