import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLink } from '../../environments/api-link.environment';
import { Iglobal } from '../../../shared/interfaces/globalInterface/iglobal.interface';
import { SuccessOrderData } from '../../interfaces/cartItem/cart.interface';
import { IAllItems } from '../../interfaces/cartItem/iall-items.interface';
import { IOrder } from '../../interfaces/orderInterfaces/iorder.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderServices {
  private readonly httpClint = inject(HttpClient);

  getUserOrder(): Observable<Iglobal<IOrder[]>> {
    return this.httpClint.get<Iglobal<IOrder[]>>(ApiLink.apiLink + 'user/orders');
  }

  makeOrder(orderDetails: any): Observable<Iglobal<SuccessOrderData>> {
    return this.httpClint.post<Iglobal<SuccessOrderData>>(ApiLink.apiLink + 'orders', orderDetails);
  }
}
