import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-services/admin.service';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  categories: any = [];
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';
  isSpinning: boolean;

  constructor(private adminService: AdminService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getAllCategories();
  }

  submitForm() {
    this.isSpinning = true;
    this.categories = [];
    this.adminService.searchCategoryByTitle(this.validateForm.get(['title'])!.value).subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
        this.isSpinning = false;
      });
    });
  }

  getAllCategories() {
    this.categories = [];
    this.adminService.getAllCategories().subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      });
    });
  }

}
