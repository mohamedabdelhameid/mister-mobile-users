import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iglobal } from '../../../shared/interfaces/globalInterface/iglobal.interface';
import { Icolor } from '../../interfaces/colorInterfaces/icolor.interface';
import { ApiLink } from '../../environments/api-link.environment';

@Injectable({
  providedIn: 'root',
})
export class ColorServices {
  private readonly httpClient = inject(HttpClient);

  getColors(): Observable<Iglobal<Icolor[]>> {
    return this.httpClient.get<Iglobal<Icolor[]>>(ApiLink.apiLink + 'colors');
  }
}
