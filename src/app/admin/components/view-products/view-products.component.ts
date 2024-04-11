import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AdminService } from '../../admin-services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {

  categoryId: any = this.activatedroute.snapshot.params['categoryId'];
  Products: any = [];
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';
  isSpinning: boolean;

  constructor(private adminService: AdminService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getProductsByCategory();
  }

  getProductsByCategory() {
    this.Products = [];
    this.adminService.getProductsByCategory(this.categoryId).subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.Products.push(element);
      });
    });
  }

  submitForm() {
    this.isSpinning = true;
    this.Products = [];
    this.adminService.searchProductByTitle(this.categoryId, this.validateForm.get(['title'])!.value).subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.Products.push(element);
        this.isSpinning = false;
      });
    });
  }


  deleteProduct(carId: any) {
    this.adminService.deleteProduct(carId).subscribe((res) => {
      if (res == null) {
        this.getProductsByCategory();
        this.message
          .success(
            `Product Deleted Successfully.`,
            { nzDuration: 5000 }
          );
      } else {
        this.message
          .error(
            `${res.message}`,
            { nzDuration: 5000 }
          )
      }
    });
  }

}
