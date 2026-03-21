import { NgClass, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServicesService } from '../../../core/services/authServices/auth-services.service';
import { Account } from '../../../core/interfaces/authInterfaces/iauth.interface';
import { ToastUtilService } from '../../../core/toastrServices/toastr.services';
import { OrderServices } from '../../../core/services/orderServices/order.services';
import { IAllItems } from '../../../core/interfaces/cartItem/iall-items.interface';
import { IOrder } from '../../../core/interfaces/orderInterfaces/iorder.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [NgClass, DatePipe, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private readonly authServices = inject(AuthServicesService);
  private readonly orderServices = inject(OrderServices);
  private readonly toastr = inject(ToastUtilService);
  profile: WritableSignal<Account | null> = signal(null);
  profileLoading: WritableSignal<boolean> = signal(false);
  orders: WritableSignal<IOrder[] | null> = signal(null);
  subscription!: Subscription;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProfileData();
  }

  getProfileData(): void {
    this.profileLoading.set(true);
    this.subscription = this.authServices.getAccountData().subscribe({
      next: (res) => {
        this.profile.set(res);
        this.getUserOrder();
        this.profileLoading.set(false);
      },
      error: (err) => {
        this.toastr.error('يرجى إعادة تسجيل الدخول', 'فشل');
        this.profileLoading.set(false);
      },
    });
  }

  getUserOrder(): void {
    this.subscription = this.orderServices.getUserOrder().subscribe({
      next: (res) => {
        this.orders.set(res.data);
      },
      error: (err) => {
        this.toastr.error('يرجى اعادة تسجيل الدخول', 'فشل');
      },
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class
    this.subscription.unsubscribe();
  }
}
