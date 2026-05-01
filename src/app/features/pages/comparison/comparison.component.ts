import { NgClass, DecimalPipe } from '@angular/common';
import { Component, inject, signal, WritableSignal, computed } from '@angular/core';
import { Iproduct } from '../../../core/interfaces/productServices/iproduct.interface';
import { ToastrService } from 'ngx-toastr';
import { ProductServicesServices } from '../../../core/services/productServices/product-services.services';
import { Iglobal } from '../../../shared/interfaces/globalInterface/iglobal.interface';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ApiLink } from '../../../core/environments/api-link.environment';

@Component({
  selector: 'app-comparison',
  imports: [NgClass, FormsModule, DecimalPipe],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.css',
})
export class ComparisonComponent {
  private readonly productServicesServices = inject(ProductServicesServices);
  private readonly toastr = inject(ToastrService);
  readonly apiLink = ApiLink;

  mobiles: WritableSignal<Iproduct[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  selectedPhone1: WritableSignal<Iproduct | null> = signal(null);
  selectedPhone2: WritableSignal<Iproduct | null> = signal(null);

  search1: WritableSignal<string> = signal('');
  search2: WritableSignal<string> = signal('');

  showDropdown1: WritableSignal<boolean> = signal(false);
  showDropdown2: WritableSignal<boolean> = signal(false);

  canCompare = computed(() => !!this.selectedPhone1() && !!this.selectedPhone2());

  filteredMobiles1 = computed(() => {
    const q = this.search1().toLowerCase().trim();
    const excluded = this.selectedPhone2()?.id;
    return this.mobiles().filter(
      (m) => m.id !== excluded && (!q || m.title.toLowerCase().includes(q)),
    );
  });

  filteredMobiles2 = computed(() => {
    const q = this.search2().toLowerCase().trim();
    const excluded = this.selectedPhone1()?.id;
    return this.mobiles().filter(
      (m) => m.id !== excluded && (!q || m.title.toLowerCase().includes(q)),
    );
  });

  specRows: { icon: string; label: string; key: keyof Iproduct }[] = [
    { icon: 'fa-microchip', label: 'المعالج', key: 'processor' },
    { icon: 'fa-mobile-screen', label: 'الشاشة', key: 'display' },
    { icon: 'fa-camera', label: 'الكاميرا', key: 'camera' },
    { icon: 'fa-battery-full', label: 'البطارية', key: 'battery' },
    { icon: 'fa-hard-drive', label: 'التخزين', key: 'storage' },
    { icon: 'fa-circle-dot', label: 'نظام التشغيل', key: 'operating_system' },
    { icon: 'fa-wifi', label: 'الشبكة', key: 'network_support' },
    { icon: 'fa-calendar', label: 'سنة الإصدار', key: 'release_year' },
  ];

  subscription!: Subscription;

  ngOnInit(): void {
    this.getMobiles();
  }

  getMobiles(): void {
    this.isLoading.set(true);
    this.subscription = this.productServicesServices.getAllProducts().subscribe({
      next: (res: Iglobal<Iproduct[]>) => {
        this.mobiles.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastr.error(`${err.error.message}`, `${err.error.success}`, {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 3000,
        });
        this.isLoading.set(false);
      },
    });
  }

  selectPhone1(phone: Iproduct): void {
    this.selectedPhone1.set(phone);
    this.search1.set('');
    this.showDropdown1.set(false);
  }

  selectPhone2(phone: Iproduct): void {
    this.selectedPhone2.set(phone);
    this.search2.set('');
    this.showDropdown2.set(false);
  }

  clearPhone1(): void {
    this.selectedPhone1.set(null);
    this.search1.set('');
    this.showDropdown1.set(false);
  }

  clearPhone2(): void {
    this.selectedPhone2.set(null);
    this.search2.set('');
    this.showDropdown2.set(false);
  }

  resetComparison(): void {
    this.clearPhone1();
    this.clearPhone2();
  }

  getVal(phone: Iproduct | null, key: keyof Iproduct): string {
    if (!phone) return '—';
    const val = phone[key];
    if (val === null || val === undefined || val === '') return '—';
    if (key === 'battery') return `mAh : ${val} `;
    if (key === 'brand') return (val as any)?.name ?? '—';
    return String(val);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
