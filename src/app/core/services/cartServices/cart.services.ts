import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLink } from '../../environments/api-link.environment';
import { Iglobal } from '../../../shared/interfaces/globalInterface/iglobal.interface';
import { Cart, mobileData } from '../../interfaces/cartItem/cart.interface';
import { IAllItems } from '../../interfaces/cartItem/iall-items.interface';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private readonly httpClient = inject(HttpClient);
  cartCount: WritableSignal<number> = signal<number>(0);

  getCartItems(): Observable<Iglobal<IAllItems>> {
    return this.httpClient.get<Iglobal<IAllItems>>(ApiLink.apiLink + 'cart');
  }

  deleteAllCartItems(): Observable<Iglobal<IAllItems>> {
    return this.httpClient.delete<Iglobal<IAllItems>>(ApiLink.apiLink + 'cart');
  }

  addMobileToCart(mobileData: mobileData): Observable<Iglobal<Cart>> {
    return this.httpClient.post<Iglobal<Cart>>(ApiLink.apiLink + 'cart-items', mobileData);
  }

  updateQuantity(mobileId: string, updatedQuantity: any): Observable<Iglobal<Cart>> {
    return this.httpClient.put<Iglobal<Cart>>(
      ApiLink.apiLink + `cart-items/${mobileId}`,
      updatedQuantity,
    );
  }

  deleteOneItem(mobileId: string): Observable<any> {
    return this.httpClient.delete<any>(ApiLink.apiLink + `cart-items/${mobileId}`);
  }
}
