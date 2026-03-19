import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastUtilService } from '../../toastrServices/toastr.services';
import { Subscription } from 'rxjs';
import { AuthServicesService } from '../../services/authServices/auth-services.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServicesService);
  registerForm!: FormGroup;
  authSubscription!: Subscription;
  toastr = inject(ToastUtilService);
  isLoading: WritableSignal<boolean> = signal(false);

  showPassword = signal(false);
  showConfirm = signal(false);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.intializeRegisterForm();
  }

  intializeRegisterForm() {
    this.registerForm = this.fb.group(
      {
        first_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)]],
        last_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        phone_number: ['', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
        area: ['', [Validators.required, Validators.pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)]],
        city: ['', [Validators.required, Validators.pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)]],
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

    this.authSubscription = this.authService.addNewUser(this.registerForm.value).subscribe({
      next: (res) => {
        this.toastr.success('يرجى تأكيد حسابك عبر الايميل المرسل لكم.', 'نجحت');
        this.registerForm.reset();
      },
      error: (err) => {
        console.log(err);

        let message = '';
        if (err.error?.includes('The email has already been taken')) {
          message = 'الايميل مستخدم بالفعل';
        } else {
          message = err.error.message;
        }

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
