import { ContactService } from './../../../core/services/conactServices/contact.service';
import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastUtilService } from '../../../core/toastrServices/toastr.services';

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  contactForm!: FormGroup;
  authSubscription!: Subscription;
  toastr = inject(ToastUtilService);
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private plateFormId = inject(PLATFORM_ID);
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    this.isLoading.set(true);

    if (this.contactForm.valid) {
      this.authSubscription?.unsubscribe();
      this.authSubscription = this.contactService
        .sendConatctMessage(this.contactForm.value)
        .subscribe({
          next: (res) => {
            this.toastr.success(`الرسالة وصلت بنجاح`, `نجحت`, {
              progressBar: true,
              progressAnimation: 'decreasing',
              timeOut: 3000,
            });

            this.contactForm.reset();
            this.isLoading.set(false);
          },
          error: (err) => {
            this.toastr.error(`فشل ارسال الرسالة حاول مرة اخرى`, `فشل`);
            this.isLoading.set(false);
          },
        });
    } else {
      this.contactForm.markAllAsTouched();
      this.isLoading.set(false);
    }
  }
}
