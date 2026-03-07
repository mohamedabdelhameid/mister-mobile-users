import { ApiLink } from './../../../../core/environments/api-link.environment';
import { Ibrand } from '../../../../core/interfaces/brandInterface/ibrand.interface';
import { Iglobal } from '../../../../shared/interfaces/globalInterface/iglobal.interface';
import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BrandServicesServices } from '../../../../core/services/brandServices/brand-services.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-branding',
  imports: [CarouselModule],
  templateUrl: './home-branding.component.html',
  styleUrl: './home-branding.component.css',
})
export class HomeBrandingComponent {
  private readonly brandServicesServices = inject(BrandServicesServices);
  private readonly toastr = inject(ToastrService);
  apiLink = ApiLink;
  subscription!: Subscription;

  brands: WritableSignal<Ibrand[]> = signal([]);

  ngOnInit(): void {
    this.getBrands();
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
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };

  getBrands(): void {
    this.subscription = this.brandServicesServices.getAllBrands().subscribe({
      next: (res: Iglobal<Ibrand[]>) => {
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class
    this.subscription.unsubscribe();
  }
}
