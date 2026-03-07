import { Component, inject, input } from '@angular/core';
import { Iproduct } from '../../../core/interfaces/productServices/iproduct.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  router = inject(Router);

  item = input<Iproduct>();
}
