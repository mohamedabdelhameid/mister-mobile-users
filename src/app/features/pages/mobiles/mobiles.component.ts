import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiLink } from '../../../core/environments/api-link.environment';
import { Iproduct } from '../../../core/interfaces/productServices/iproduct.interface';
import { ProductServicesServices } from '../../../core/services/productServices/product-services.services';
import { Iglobal } from '../../../shared/interfaces/globalInterface/iglobal.interface';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BrandServicesServices } from '../../../core/services/brandServices/brand-services.services';
import { Ibrand } from '../../../core/interfaces/brandInterface/ibrand.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mobiles',
  imports: [CardComponent, CarouselModule],
  templateUrl: './mobiles.component.html',
  styleUrl: './mobiles.component.css',
})
export class MobilesComponent {
  private readonly productServicesServices = inject(ProductServicesServices);
  private readonly brandServicesServices = inject(BrandServicesServices);
  private readonly toastr = inject(ToastrService);
  apiLink = ApiLink;
  subscription!: Subscription;

  products: WritableSignal<Iproduct[]> = signal([]);
  productFilter: WritableSignal<Iproduct[]> = signal([]);
  brands: WritableSignal<Ibrand[]> = signal([]);
  selectedBrand: WritableSignal<string | null> = signal(null);

  ngOnInit(): void {
    this.getProducts();
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    rtl: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 5,
      },
      740: {
        items: 6,
      },
      940: {
        items: 8,
      },
    },
  };

  getBrands(): void {
    this.subscription = this.brandServicesServices.getAllBrands().subscribe({
      next: (res) => {
        this.brands.set(res.data);
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

  getProducts(): void {
    this.getBrands();
    this.subscription = this.productServicesServices.getAllProducts().subscribe({
      next: (res: Iglobal<Iproduct[]>) => {
        this.products.set(res.data);
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

  filterByBrand(brandId: string): void {
    this.selectedBrand.set(brandId);

    this.productFilter.set(this.products().filter((product) => product.brand.id === brandId));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class
    this.subscription.unsubscribe();
  }
}
