import { Routes } from '@angular/router';
import { authGuard } from './core/guards/authGuard/auth-guard';
import { guestGuardGuard } from './core/guards/guestGuard/guest-guard-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/pages/home/home.component').then((m) => m.HomeComponent),
    title: 'الرئيسية',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/pages/about/about.component').then((m) => m.AboutComponent),
    title: 'عن LUXA',
  },
  {
    path: 'mobiles',
    loadComponent: () =>
      import('./features/pages/mobiles/mobiles.component').then((m) => m.MobilesComponent),
    title: 'متجرنا',
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('./features/pages/contact-us/contact-us.component').then((m) => m.ContactUsComponent),
    title: 'تواصل معنا',
  },
  {
    path: 'search-mobiles',
    loadComponent: () =>
      import('./features/pages/search/search.component').then((m) => m.SearchComponent),
    title: 'بحث عن هاتف',
  },
  {
    path: 'policies',
    loadComponent: () =>
      import('./features/pages/policies/policies.component').then((m) => m.PoliciesComponent),
    title: 'سياستنا',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./core/auth/register/register.component').then((m) => m.RegisterComponent),
    title: 'تسجيل حساب جديد',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then((m) => m.LoginComponent),
    title: 'تسجيل دخول',
    canActivate: [authGuard],
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./core/auth/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent,
      ),
    title: 'نسيت كلمة السر',
    canActivate: [authGuard],
  },
  {
    path: 'resetPassword',
    loadComponent: () =>
      import('./core/auth/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent,
      ),
    title: 'نسيت كلمة السر',
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/pages/cart/cart.component').then((m) => m.CartComponent),
    title: 'قائمة المشتريات',
    canActivate: [guestGuardGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/pages/profile/profile.component').then((m) => m.ProfileComponent),
    title: 'معلومات حسابك',
    canActivate: [guestGuardGuard],
  },
  {
    path: 'mobiles/:id',
    loadComponent: () =>
      import('./features/pages/mobile-details/mobile-details.component').then(
        (m) => m.MobileDetailsComponent,
      ),
    title: 'تفاصيل الموبايل',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'صفحة غير موجوده',
  },
];
