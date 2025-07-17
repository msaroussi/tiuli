import { Injectable, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private primeNG = inject(PrimeNG);

  private presets = {
    aura: Aura,
    material: Aura, // Fallback to Aura if Material not available
    nora: Aura,     // Fallback to Aura if Nora not available  
    lara: Aura      // Fallback to Aura if Lara not available
  };

  switchPreset(presetName: 'aura' | 'material' | 'nora' | 'lara') {
    const preset = this.presets[presetName];
    this.primeNG.theme.set({
      preset: preset,
      options: {
        prefix: 'p',
        darkModeSelector: '.dark-mode',
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities'
        }
      }
    });
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark-mode');
  }
}