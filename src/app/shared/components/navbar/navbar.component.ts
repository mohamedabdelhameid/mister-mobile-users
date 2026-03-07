import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  HostListener,
  inject,
  PLATFORM_ID,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServicesService } from '../../../core/services/authServices/auth-services.service';
import { JWTDecode } from '../../../core/interfaces/authInterfaces/iauth.interface';
import { ToastUtilService } from '../../../core/toastrServices/toastr.services';
import { CartServices } from '../../../core/services/cartServices/cart.services';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isDropdownOpen = false;
  isMenuOpen = false;
  private platformID = inject(PLATFORM_ID);
  private cartServices = inject(CartServices);
  toastr = inject(ToastUtilService);
  authservices = inject(AuthServicesService);
  userDataDecoded: WritableSignal<JWTDecode | undefined> = signal(undefined);
  isLoggedIn: WritableSignal<boolean> = signal(false);
  countCart: Signal<number> = computed(() => this.cartServices.cartCount());

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /** Close the dropdown when user clicks anywhere outside the navbar */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInsideNav = (event.target as HTMLElement).closest('nav');
    if (!clickedInsideNav) {
      this.isDropdownOpen = false;
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.checkUserLogin();
  }

  getCartCount() {
    this.cartServices.getCartItems().subscribe({
      next: (res) => {
        this.cartServices.cartCount.set(res.data?.items?.length);
      },
    });
  }

  checkUserLogin() {
    if (isPlatformBrowser(this.platformID)) {
      const token = localStorage.getItem('user_access_token');
      if (token) {
        this.isLoggedIn.set(true);
        this.getCartCount();
      } else {
        this.isLoggedIn.set(false);
      }
    }
  }

  signOut() {
    if (isPlatformBrowser(this.platformID)) {
      localStorage.removeItem('user_access_token');
      this.isLoggedIn.set(false);
      this.toastr.warning(`تم تسجيل خروجك بنجاح سيتم اعادة تهيئة الصفحات كضيف`, `تسجيل خروج`, {
        progressBar: true,
        progressAnimation: 'decreasing',
        timeOut: 3000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }
}
