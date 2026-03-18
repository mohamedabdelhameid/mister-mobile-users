import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastUtilService } from '../../toastrServices/toastr.services';
import { AuthServicesService } from '../../services/authServices/auth-services.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServicesService);
  private router = inject(Router);
  private plateFormId = inject(PLATFORM_ID);
  loginForm!: FormGroup;
  authSubscription!: Subscription;
  toastr = inject(ToastUtilService);

  showPassword = signal(false);
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

      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.authService.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        if (isPlatformBrowser(this.plateFormId)) {
          localStorage.setItem('user_access_token', res.access_token);
          this.authService.decodeUserData();
        }

        location.href = '/home';

        this.toastr.success('تم تسجيل دخولك بنجاح', 'نجحت');
        // this.intializeLoginForm();
        this.loginForm.reset();
      },
      error: (err) => {
        let message = '';

        if (err.error?.error.includes('Please verify your email before logging in.')) {
          message = 'يرجى تفعيل حسابك قبل تسجيل الدخول';
        } else if (err.error?.error.includes('Invalid credentials')) {
          message = 'الايميل او الباسورد غير صحيح';
        } else {
          message = err.error.message;
        }

        this.toastr.error(message, 'فشل');
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
