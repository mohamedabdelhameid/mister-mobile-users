import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
  readonly router = inject(Router);
  onWhatsAppOrder(): void {
    const phone = '201035405480';
    const message = encodeURIComponent('مرحباً، محتاج أطلب موبايل لو سمحت. ممكن أعرف التفاصيل؟');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }
}
