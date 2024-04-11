import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  isSpinning = false;

  submitForm(): void {
    this.isSpinning = true;
    this.authService.login(this.validateForm.value).subscribe(
      (res) => {
        if (res.userId != null) {
          console.log(res);
          const user = {
            id: res.userId,
            role: res.userRole
          }
          console.log(user);
          UserStorageService.saveUser(user);
          UserStorageService.saveToken(res.jwt);
          if (UserStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
          } else if (UserStorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('customer/dashboard');
          }
        } else {
          this.notification
            .error(
              'ERROR',
              `Bad credentials`,
              { nzDuration: 5000 }
            )
        }
        this.isSpinning = false;
      })
  }

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router,) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}