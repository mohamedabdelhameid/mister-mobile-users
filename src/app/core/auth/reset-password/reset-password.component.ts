import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServicesService } from '../../services/authServices/auth-services.service';
import { ToastUtilService } from '../../toastrServices/toastr.services';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServicesService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  registerForm!: FormGroup;
  authSubscription!: Subscription;
  toastr = inject(ToastUtilService);
  isLoading: WritableSignal<boolean> = signal(false);
  resetToken: WritableSignal<string | null> = signal('');

  showPassword = signal(false);
  showConfirm = signal(false);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.intializeRegisterForm();
  }

  getResetToken() {
    this.activatedRoute.queryParamMap.subscribe({
      next: (res) => {
        this.resetToken.set(res.get('token'));
      },
    });
  }

  intializeRegisterForm() {
    this.getResetToken();
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        token: [`${this.resetToken()}`],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
          ],
        ],
        password_confirmation: ['', [Validators.required]],
      },
      { validators: this.confirmPassword },
    );
  }

  confirmPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const password_confirmation = group.get('password_confirmation')?.value;
    return password === password_confirmation ? null : { mismatch: true };
  }

  register() {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.authService.resetPassword(this.registerForm.value).subscribe({
      next: (res) => {
        this.toastr.success(
          'تم تغيير كلمة السر بنجاح سيتم توجيهك الى صفحة تسجيل الدخول بعد 3 من الثواني',
          'نجحت',
        );
        // this.intializeRegisterForm();
        this.registerForm.reset();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        const message = err.error.error?.includes('Invalid or expired reset token.')
          ? 'وقت المسموح للتغير انتهى يرجى اعادة الخطوات وارسال البريد الالكتروني في صفحة نسيت كلمة السر'
          : err.error;

        this.toastr.error(message, 'فشل');
      },
    });
  }

  onSubmit() {
    this.isLoading.set(true);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.register();
      this.isLoading.set(false);
    }
  }
}
