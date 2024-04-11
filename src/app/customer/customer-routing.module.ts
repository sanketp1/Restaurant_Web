import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerGuard } from '../guards/authCustomer/customer.guard';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { PostReservationRequestComponent } from './components/post-reservation-request/post-reservation-request.component';
import { MyReservationRequestsComponent } from './components/my-reservation-requests/my-reservation-requests.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [CustomerGuard] },
  { path: ':categoryId/view_products', component: ViewProductComponent, canActivate: [CustomerGuard] },
  { path: 'reservation', component: PostReservationRequestComponent, canActivate: [CustomerGuard] },
  { path: 'my_reservations', component: MyReservationRequestsComponent, canActivate: [CustomerGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
