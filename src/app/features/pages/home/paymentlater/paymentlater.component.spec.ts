import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentlaterComponent } from './paymentlater.component';

describe('PaymentlaterComponent', () => {
  let component: PaymentlaterComponent;
  let fixture: ComponentFixture<PaymentlaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentlaterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentlaterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
