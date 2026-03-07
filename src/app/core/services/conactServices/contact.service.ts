import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLink } from '../../environments/api-link.environment';
import { Iglobal } from '../../../shared/interfaces/globalInterface/iglobal.interface';
import { Icontact, IContactData } from '../../interfaces/contactInterfaces/icontact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly httpClient = inject(HttpClient);

  sendConatctMessage(contactData: IContactData): Observable<Iglobal<Icontact>> {
    return this.httpClient.post<Iglobal<Icontact>>(ApiLink.apiLink + 'contact-us', contactData);
  }
}
