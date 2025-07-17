import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
// import Material from '@primeng/themes/material'; // Uncomment to use Material preset
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(), // Added for PrimeNG animations
    providePrimeNG({
      theme: {
        preset: Aura, // Change to Material if you want Material Design
        // preset: Material // Uncomment this and comment Aura above
        options: {
          prefix: 'p',
          darkModeSelector: '.dark-mode', // Enable dark mode switching
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
      }
    })
  ],
};