import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServicesService } from '../../services/authServices/auth-services.service';
import { ToastUtilService } from '../../toastrServices/toastr.services';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServicesService);
  private router = inject(Router);
  private plateFormId = inject(PLATFORM_ID);
  loginForm!: FormGroup;
  authSubscription!: Subscription;
  toastr = inject(ToastUtilService);

  isLoading = signal(false);
  errorMsg = signal('');
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.intializeLoginForm();
  }

  intializeLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  login() {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.authService.forgetPassword(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);

        this.toastr.success('تم إرسال رسالة التأكيد عبر الايميل', 'نجحت');
        // this.intializeLoginForm();
        this.loginForm.reset();
      },
      error: (err) => {
        this.toastr.error('فشل الإرسال', 'فشل');
      },
    });
  }

  onSubmit() {
    this.isLoading.set(true);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.login();
      this.isLoading.set(false);
    }
  }
}
