import { ColorServices } from './../../../core/services/colorServices/color.services';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartServices } from '../../../core/services/cartServices/cart.services';
import { ToastUtilService } from '../../../core/toastrServices/toastr.services';
import { IAllItems } from '../../../core/interfaces/cartItem/iall-items.interface';
import { Icolor } from '../../../core/interfaces/colorInterfaces/icolor.interface';
import { ModalComponent } from './modal/modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, ModalComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private readonly cartServices = inject(CartServices);
  private readonly colorServices = inject(ColorServices);
  cartItems: WritableSignal<IAllItems | null> = signal(null);
  colorItems: WritableSignal<Icolor[] | null> = signal(null);
  toastr = inject(ToastUtilService);
  @ViewChild(ModalComponent) modal!: ModalComponent;
  subscription!: Subscription;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllItems();
  }

  getColors() {
    this.subscription = this.colorServices.getColors().subscribe({
      next: (res) => {
        this.colorItems.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  findColor(id: string) {
    return this.colorItems()?.find((c) => c.id === id);
  }

  getAllItems(): void {
    this.subscription = this.cartServices.getCartItems().subscribe({
      next: (res) => {
        this.cartItems.set(res.data);
        this.getColors();
        this.cartServices.cartCount.set(res.data.items.length);
      },
      error: (err) => {
        this.toastr.error('اعد المحالولة بعد اعادة تسجيل دخولك', 'فشل');
      },
    });
  }

  deleteAllCartItems(): void {
    this.subscription = this.cartServices.deleteAllCartItems().subscribe({
      next: (res) => {
        this.cartItems.set(res.data);
        this.cartServices.cartCount.set(res.data.items.length | 0);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updatedQuantity(mobileId: string, updateQuantity: any) {
    this.subscription = this.cartServices.updateQuantity(mobileId, updateQuantity).subscribe({
      next: (res) => {
        this.toastr.success('تم تحديث العدد بنجاح', 'نجحت');
        this.getAllItems();
        this.cartServices.cartCount.set(res.data.items.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteProductItem(mobileId: string): void {
    this.subscription = this.cartServices.deleteOneItem(mobileId).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllItems();
        this.cartServices.cartCount.set(res.data.items.length | 0);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openModal() {
    this.modal.open();
  }
  closeModal() {
    this.modal.close();
  }

  checkoutFn(): void {
    this.openModal();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class
    this.subscription.unsubscribe();
  }
}
