import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let plate_id = inject(PLATFORM_ID);

  if (isPlatformBrowser(plate_id)) {
    const token = localStorage.getItem('user_access_token');
    if (token) {
      if (
        req.url.includes('orders') ||
        req.url.includes('users') ||
        req.url.includes('auth/verifyToken') ||
        req.url.includes('wishlist') ||
        req.url.includes('cart-items') ||
        req.url.includes('user/getaccount') ||
        req.url.includes('user/orders') ||
        req.url.includes('user/password/forgot') ||
        req.url.includes('cart')
      ) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
      }
    } else {
      req = req.clone({
        setHeaders: {
          Accept: 'application/json',
        },
      });
    }
  }
  return next(req);
};
