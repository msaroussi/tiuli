import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DockModule } from 'primeng/dock';
import { Router } from '@angular/router';
import { DockPosition, PanelToggleService } from '../../services/panel-toggle.service';
import { Dock } from 'primeng/dock';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, RouterLink, ButtonModule, DockModule, Dock],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  dockPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  currentPreset: 'aura' | 'material' | 'nora' | 'lara' = 'aura';
  private router = inject(Router);
  private panelToggleService = inject(PanelToggleService);
  private themeService = inject(ThemeService);
  private buttonsDockSubscription?: Subscription;
  isDarkMode = false;

  dockItems = [
    { label: 'Back to Map', icon: 'pi pi-arrow-left', action: 'map' },
    { label: 'Save Settings', icon: 'pi pi-save', action: 'save' },
    { label: 'Reset', icon: 'pi pi-refresh', action: 'reset' },
    { label: 'Dark Mode', icon: 'pi pi-moon', action: 'darkMode' },
    { label: 'Position', icon: 'pi pi-arrows-h', action: 'switchDockPosition' },
    { label: 'Change Preset', icon: 'pi pi-palette', action: 'changePreset' },
    { label: 'Help', icon: 'pi pi-question', action: 'help' }
  ];

  dockDesignTokens = {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    item: {
      size: '3rem',
      borderRadius: '8px',
      background: 'transparent',
      hoverBackground: 'rgba(0, 0, 0, 0.05)',
      activeBackground: 'rgba(0, 0, 0, 0.1)'
    }
  };

  ngOnInit(): void {
    this.buttonsDockSubscription = this.panelToggleService.buttonsDockStatus$.subscribe(
      status => {
        this.dockPosition = status as 'bottom' | 'top' | 'left' | 'right';
        console.log('settings page dockPosition: ' + this.dockPosition);
      }
    );
  }

  ngOnDestroy(): void {
    this.buttonsDockSubscription?.unsubscribe();
  }

  onItemClick(item: any): void {
    console.log('Settings dock item clicked:', item);
    
    switch (item.action) {
      case 'map':
        this.router.navigate(['/map']);
        break;
      case 'save':
        this.saveSettings();
        break;
      case 'reset':
        this.resetSettings();
        break;
      case 'darkMode':
        this.toggleDarkMode();
        break;
      case 'help':
        this.showHelp();
        break;
      case 'switchDockPosition':
        this.switchDockPosition();
        break;
      case 'changePreset':
        this.changePreset();
        break;
      default:
        console.log('Unknown action:', item.action);
    }
  }

  private saveSettings(): void {
    console.log('Settings saved');
    // Add your save logic here
  }

  private resetSettings(): void {
    console.log('Settings reset');
    // Add your reset logic here
  }

  private switchDockPosition(): void {
    const positions = ['top', 'bottom', 'left', 'right'];
    const currentIndex = positions.indexOf(this.dockPosition);
    const nextIndex = (currentIndex + 1) % positions.length;
    this.dockPosition = positions[nextIndex] as 'top' | 'bottom' | 'left' | 'right';
    this.panelToggleService.setButtonsDockStatus(this.dockPosition as DockPosition);
  }

  private changePreset(): void {
    const presets: ('aura' | 'material' | 'nora' | 'lara')[] = ['aura', 'material', 'nora', 'lara'];
    const currentIndex = presets.indexOf(this.currentPreset);
    const nextIndex = (currentIndex + 1) % presets.length;
    this.currentPreset = presets[nextIndex];

    console.log('Switching to preset:', this.currentPreset);
    this.themeService.switchPreset(this.currentPreset);
  }

  private toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleDarkMode();
    console.log('Dark mode toggled:', this.isDarkMode ? 'Dark' : 'Light');
  }

  private showHelp(): void {
    console.log('Help requested');
    // Add your help logic here
  }
}
