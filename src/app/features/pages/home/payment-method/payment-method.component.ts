import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-method',
  imports: [],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.css',
})
export class PaymentMethodComponent {
  openInstallment(company: string): void {
    const phone = '201035405480';

    const message = encodeURIComponent(`مرحباً، محتاج أعرف تفاصيل التقسيط مع ${company}`);

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }
}
