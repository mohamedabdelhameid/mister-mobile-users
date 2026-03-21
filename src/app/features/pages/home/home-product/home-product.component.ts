import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ProductServicesServices } from '../../../../core/services/productServices/product-services.services';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ApiLink } from '../../../../core/environments/api-link.environment';
import { Ibrand } from '../../../../core/interfaces/brandInterface/ibrand.interface';
import { Iglobal } from '../../../../shared/interfaces/globalInterface/iglobal.interface';
import { Iproduct } from '../../../../core/interfaces/productServices/iproduct.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-product',
  imports: [CardComponent, CarouselModule],
  templateUrl: './home-product.component.html',
  styleUrl: './home-product.component.css',
})
export class HomeProductComponent {
  private readonly productServicesServices = inject(ProductServicesServices);
  private readonly toastr = inject(ToastrService);
  apiLink = ApiLink;
  subscription!: Subscription;
  isLoading: WritableSignal<boolean> = signal(false);
  products: WritableSignal<Iproduct[]> = signal([]);

  ngOnInit(): void {
    this.getProducts();
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    rtl: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
  };

  getProducts(): void {
    this.isLoading.set(true);
    this.subscription = this.productServicesServices.getAllProducts().subscribe({
      next: (res: Iglobal<Iproduct[]>) => {
        this.products.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastr.error(`${err.error.message}`, `${err.error.success}`, {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 3000,
        });
        this.isLoading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
