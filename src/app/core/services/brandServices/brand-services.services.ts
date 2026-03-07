import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iglobal } from '../../../shared/interfaces/globalInterface/iglobal.interface';
import { Ibrand } from '../../interfaces/brandInterface/ibrand.interface';
import { ApiLink } from '../../environments/api-link.environment';

@Injectable({
  providedIn: 'root',
})
export class BrandServicesServices {
  private readonly httpClient = inject(HttpClient);

  getAllBrands(): Observable<Iglobal<Ibrand[]>> {
    return this.httpClient.get<Iglobal<Ibrand[]>>(ApiLink.apiLink + 'brands');
  }
}
