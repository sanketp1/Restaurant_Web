import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/authAdmin/admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ViewReservationRequestsComponent } from './components/view-reservation-requests/view-reservation-requests.component';

const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'category', component: PostCategoryComponent, canActivate: [AdminGuard] },
  { path: ':categoryId/product', component: PostProductComponent, canActivate: [AdminGuard] },
  { path: ':categoryId/view_products', component: ViewProductsComponent, canActivate: [AdminGuard] },
  { path: 'edit_product/:productId', component: UpdateProductComponent, canActivate: [AdminGuard] },
  { path: 'reservations', component: ViewReservationRequestsComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
