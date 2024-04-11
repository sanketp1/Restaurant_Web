import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ViewReservationRequestsComponent } from './components/view-reservation-requests/view-reservation-requests.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    PostCategoryComponent,
    PostProductComponent,
    UpdateProductComponent,
    ViewProductsComponent,
    ViewReservationRequestsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
