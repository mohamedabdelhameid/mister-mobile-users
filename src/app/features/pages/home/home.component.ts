import { Component } from '@angular/core';
import { LandingComponent } from './landing/landing.component';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { HomeBrandingComponent } from './home-branding/home-branding.component';
import { HomeProductComponent } from './home-product/home-product.component';
import { PaymentlaterComponent } from './paymentlater/paymentlater.component';

@Component({
  selector: 'app-home',
  imports: [
    LandingComponent,
    HorizontalBarComponent,
    PaymentMethodComponent,
    HomeBrandingComponent,
    HomeProductComponent,
    PaymentlaterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
