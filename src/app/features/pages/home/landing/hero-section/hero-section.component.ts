import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
  onWhatsAppOrder(): void {
    const phone = '201120203912';
    const message = encodeURIComponent('مرحباً، حابب أطلب موبايل لو سمحت. ممكن أعرف التفاصيل؟');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }
}
