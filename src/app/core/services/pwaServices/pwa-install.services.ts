import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private deferredPrompt: any;
  canInstall = false;

  constructor() {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      this.canInstall = false;
      return;
    }

    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.canInstall = true;
    });

    window.addEventListener('appinstalled', () => {
      this.canInstall = false;
      this.deferredPrompt = null;

      console.log('PWA installed');
    });
  }

  async install() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();

    const choice = await this.deferredPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      console.log('User accepted install');
    }

    this.deferredPrompt = null;
    this.canInstall = false;
  }
}
