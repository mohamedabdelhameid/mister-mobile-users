import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductServicesServices } from '../../../core/services/productServices/product-services.services';
import { Iproduct } from '../../../core/interfaces/productServices/iproduct.interface';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private productServicesServices = inject(ProductServicesServices);
  router = inject(Router);

  allProducts: WritableSignal<Iproduct[]> = signal([]);
  searchQuery = signal('');
  viewMode = signal<'grid' | 'list'>('grid');
  subscription!: Subscription;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getAllProducts();
  }

  getAllProducts(): void {
    this.subscription = this.productServicesServices.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
      },
    });
  }

  filteredProducts = computed(() =>
    this.allProducts().filter((p) =>
      p.title.toLowerCase().includes(this.searchQuery().toLowerCase()),
    ),
  );

  clearSearch() {
    this.searchQuery.set('');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class
    this.subscription.unsubscribe();
  }
}
