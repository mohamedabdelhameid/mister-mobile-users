import { ActivatedRoute } from '@angular/router';
import { Iproduct, IColorItem } from '../../../core/interfaces/productServices/iproduct.interface';
import { ToastUtilService } from '../../../core/toastrServices/toastr.services';
import { Iglobal } from '../../../shared/interfaces/globalInterface/iglobal.interface';
import { ProductServicesServices } from './../../../core/services/productServices/product-services.services';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CartServices } from '../../../core/services/cartServices/cart.services';
import { mobileData } from '../../../core/interfaces/cartItem/cart.interface';

@Component({
  selector: 'app-mobile-details',
  imports: [],
  templateUrl: './mobile-details.component.html',
  styleUrl: './mobile-details.component.css',
})
export class MobileDetailsComponent {
  private readonly productServicesServices = inject(ProductServicesServices);
  private readonly cartServices = inject(CartServices);
  mobileDetails: WritableSignal<Iproduct> = signal({} as Iproduct);
  private readonly activatedRoute = inject(ActivatedRoute);
  mobileId: WritableSignal<string | null> = signal('');
  toastr = inject(ToastUtilService);
  selectedColor: WritableSignal<IColorItem | null> = signal(null);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getMobileId();
  }

  getMobileId() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.mobileId.set(res.get('id'));
        this.getMobileDetails(this.mobileId()!);
      },
    });
  }

  getMobileDetails(mobileId: string): void {
    this.productServicesServices.getProductDetails(mobileId).subscribe({
      next: (res) => {
        this.mobileDetails.set(res.data);
        this.selectedColor.set(res.data.colors.length ? res.data.colors[0] : null);
      },
      error: (err) => {
        this.toastr.error(`${err.error.message}`, `${err.error.success}`, {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 3000,
        });
      },
    });
  }

  selectColor(color: IColorItem) {
    this.selectedColor.set(color);
  }

  selectImage(img: { id: string; image: string }) {
    const color = this.selectedColor();
    if (color) {
      const index = color.images.findIndex((i) => i.id === img.id);
      if (index !== -1) {
        const temp = color.images[0];
        color.images[0] = color.images[index];
        color.images[index] = temp;
        this.selectedColor.set({ ...color });
      }
    }
  }

  onWhatsAppOrder(): void {
    const phone = '201120203912';
    const message = encodeURIComponent(
      `مرحباً، حابب أطلب موبايل ${this.mobileDetails().title} ممكن أعرف التفاصيل؟`,
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }

  addMobileToCart(): void {
    if (!this.selectedColor()) {
      this.toastr.error('يجب اختيار اللون اولا', 'فشل');
    } else {
      const mobileData: mobileData = {
        product_id: this.mobileId(),
        product_type: 'mobile',
        product_color_id: this.selectedColor()?.id,
        quantity: 1,
      };
      this.cartServices.addMobileToCart(mobileData).subscribe({
        next: (res) => {
          this.toastr.success('تم الإضافة الى قائمة المشتريات بنجاح', 'نجحت');
          this.cartServices.cartCount.set(res.data.items.length);
        },
        error: (err) => {
          this.toastr.error('فشل الإضافة حاول اعادة تسجيل الدخول لحسابك و اعد المحاولة', 'فشل');
        },
      });
    }
  }
}
