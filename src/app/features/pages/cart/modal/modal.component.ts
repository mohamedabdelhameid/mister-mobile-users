import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JWTDecode } from '../../../../core/interfaces/authInterfaces/iauth.interface';
import { ToastUtilService } from '../../../../core/toastrServices/toastr.services';
import { OrderServices } from '../../../../core/services/orderServices/order.services';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  flag: boolean = false;
  checkoutForm!: FormGroup;
  orderSubscription!: Subscription;
  orderCODSubscription!: Subscription;
  isLoading: WritableSignal<boolean> = signal(false);
  isCODLoading: WritableSignal<boolean> = signal(false);
  userData: WritableSignal<{}> = signal({});
  toastr = inject(ToastUtilService);
  private readonly fb = inject(FormBuilder);
  private orderServices = inject(OrderServices);

  open() {
    this.flag = true;
  }
  close(event?: MouseEvent) {
    event?.stopPropagation();
    this.flag = false;
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.checkoutForm = this.fb.group({
      note: ['', [Validators.required]],
      payment_method: ['cod'],
    });
  }

  CODPayment() {
    this.isCODLoading.set(true);
    this.orderSubscription?.unsubscribe();
    this.orderCODSubscription?.unsubscribe();
    this.orderCODSubscription = this.orderServices.makeOrder(this.checkoutForm.value).subscribe({
      next: (res) => {
        this.toastr.success(`تم الطلب بنجاح`, 'نجحت', {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 1000,
        });
        this.isCODLoading.set(false);
        this.checkoutForm.reset();
        this.close();
      },
      error: (err) => {
        this.toastr.error(`${err.error.message}`, `${err.error.statusMsg}`, {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 6000,
        });
        this.isCODLoading.set(false);
      },
    });
  }
}
