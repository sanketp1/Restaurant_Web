import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer-services/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  categoryId: any = this.activatedroute.snapshot.params['categoryId'];
  Products: any = [];
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';
  isSpinning: boolean;

  constructor(private customerService: CustomerService,
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getProductsByCategory();
  }

  submitForm() {
    this.isSpinning = true;
    this.Products = [];
    this.customerService.searchProductByTitle(this.categoryId, this.validateForm.get(['title'])!.value).subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.Products.push(element);
        this.isSpinning = false;
      });
    });
  }

  getProductsByCategory() {
    this.Products = [];
    this.customerService.getProductsByCategory(this.categoryId).subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.Products.push(element);
      });
    });
  }

}
