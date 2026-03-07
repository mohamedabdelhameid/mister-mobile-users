import { inject, Injectable } from '@angular/core';
import { Iproduct } from '../../interfaces/productServices/iproduct.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iglobal } from '../../../shared/interfaces/globalInterface/iglobal.interface';
import { ApiLink } from '../../environments/api-link.environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServicesServices {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(): Observable<Iglobal<Iproduct[]>> {
    return this.httpClient.get<Iglobal<Iproduct[]>>(ApiLink.apiLink + 'mobiles');
  }

  getProductDetails(productId: string): Observable<Iglobal<Iproduct>> {
    return this.httpClient.get<Iglobal<Iproduct>>(ApiLink.apiLink + `mobiles/${productId}`);
  }
}
