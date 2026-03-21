import { Component, inject, signal, WritableSignal } from '@angular/core';
import { OrderServices } from '../../../../core/services/orderServices/order.services';
import { Slot } from '../../../../core/interfaces/orderInterfaces/iorder.interface';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rewards',
  imports: [NgClass],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.css',
})
export class RewardsComponent {
  private readonly ordersServices = inject(OrderServices);
  completedOrders: WritableSignal<number> = signal(0);

  rewards = [
    { slot: 2, icon: 'fa-solid fa-percent', title: 'خصم خاص', desc: 'خصم مميز على طلبك الخامس' },
    {
      slot: 4,
      icon: 'fa-solid fa-truck',
      title: 'توصيل مجاني',
      desc: 'توصيل مجاني على طلبك التاسع',
    },
    {
      slot: 6,
      icon: 'fa-solid fa-gift',
      title: 'هدية مجانية',
      desc: 'هدية مفاجأة مع طلبك الثاني عشر',
    },
  ];

  private rewardSlots: Record<number, { icon: string; label: string }> = {
    2: { icon: 'fa-solid fa-percent', label: 'خصم' },
    4: { icon: 'fa-solid fa-truck', label: 'توصيل مجاني' },
    6: { icon: 'fa-solid fa-gift', label: 'هدية' },
  };

  slots: Slot[] = [];

  ngOnInit() {
    this.getUserOrderCount();
  }

  buildSlots() {
    this.slots = Array.from({ length: 6 }, (_, i) => {
      const number = i + 1;
      const reward = this.rewardSlots[number];
      return {
        number,
        completed: number <= this.completedOrders(),
        isReward: !!reward,
        icon: reward?.icon ?? 'fa-solid fa-mobile-screen',
        label: reward?.label ?? '',
      };
    });
  }

  getUserOrderCount(): void {
    this.ordersServices.getUserOrder().subscribe({
      next: (res) => {
        this.completedOrders.set(res.data.length);
        this.buildSlots();
      },
    });
  }
}
