import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  Account,
  INewUser,
  IOldUser,
  IRegisterResponse,
  IResetUserPassword,
  JWTDecode,
  UserLoginResponse,
} from '../../interfaces/authInterfaces/iauth.interface';
import { Observable } from 'rxjs';
import { ApiLink } from '../../environments/api-link.environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  private readonly httpClint = inject(HttpClient);
  private platformID = inject(PLATFORM_ID);
  private router = inject(Router);

  getAccountData(): Observable<Account> {
    return this.httpClint.get<Account>(ApiLink.apiLink + 'user/getaccount');
  }

  addNewUser(userData: INewUser): Observable<IRegisterResponse> {
    return this.httpClint.post<IRegisterResponse>(ApiLink.apiLink + 'user/register', userData);
  }

  loginUser(userData: IOldUser): Observable<UserLoginResponse> {
    return this.httpClint.post<UserLoginResponse>(ApiLink.apiLink + 'user/login', userData);
  }

  forgetPassword(userData: { email: string }): Observable<{ message: string }> {
    return this.httpClint.post<{ message: string }>(
      ApiLink.apiLink + 'user/password/forgot',
      userData,
    );
  }

  resetPassword(userData: IResetUserPassword): Observable<{ message: string }> {
    return this.httpClint.post<{ message: string }>(
      ApiLink.apiLink + 'user/password/reset',
      userData,
    );
  }

  decodeUserData(): JWTDecode | undefined {
    if (isPlatformBrowser(this.platformID)) {
      if (localStorage.getItem('user_access_token')) {
        const token = localStorage.getItem('user_access_token')!;
        const decoded = jwtDecode(token) as JWTDecode;
        return decoded;
      } else {
        this.router.navigate(['/login']);
        return undefined;
      }
    } else {
      return undefined;
    }
  }
}
