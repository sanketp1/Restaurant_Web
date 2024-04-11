import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {

  validateForm!: FormGroup;
  isSpinning = false;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    console.log(this.validateForm.valid);
    console.log(this.validateForm);
    if (this.validateForm.valid) {
      console.log("In function");
      this.isSpinning = true;
      const formData: FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('name', this.validateForm.get('name').value);
      formData.append('description', this.validateForm.get('description').value);
      console.log(formData);
      this.adminService.addCategory(formData).subscribe((res) => {
        this.isSpinning = false;
        if (res.id != null) {
          this.message
            .success(
              `Category Posted Successfully.`,
              { nzDuration: 5000 }
            );
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.message
            .error(
              `${res.message}`,
              { nzDuration: 5000 }
            )
        }
      });
    } else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
