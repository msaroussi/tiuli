import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Map } from '../../components/map/map';
import { LeftBar } from '../../components/left-bar/left-bar';
import { RightBar } from '../../components/right-bar/right-bar';
import { TopBar } from '../../components/top-bar/top-bar';
import { RightToolbar } from '../../components/right-toolbar/right-toolbar';
import { DockPosition, PanelToggleService } from '../../services/panel-toggle.service';
import { Dock } from "primeng/dock";

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    CommonModule,
    Map,
    LeftBar,
    RightBar,
    TopBar,
    RightToolbar,
    Dock
],
  templateUrl: 'map-page.component.html',
  styleUrls: ['map-page.component.css']
})
export class MapPageComponent implements OnInit, OnDestroy {
  rightBarVisible = true;
  dockPosition: 'bottom' | 'top' | 'left' | 'right' = 'top';
  dockItems = [
    { 
      label: 'Search', 
      icon: 'pi pi-search', // Keep icon for p-dock compatibility
      command: () => this.onItemClick({ label: 'Search', action: 'search' })
    },
    { 
      label: 'Layers', 
      icon: 'pi pi-layer',
      command: () => this.onItemClick({ label: 'Layers', action: 'layers' })
    },
    { 
      label: 'Settings', 
      icon: 'pi pi-cog',
      command: () => this.onItemClick({ label: 'Settings', action: 'settings' })
    },
    { 
      label: 'Map', 
      icon: 'pi pi-map',
      command: () => this.onItemClick({ label: 'Map', action: 'map' })
    },
    { 
      label: 'Toggle Panel', 
      icon: 'pi pi-bars',
      command: () => this.onItemClick({ label: 'Toggle Panel', action: 'toggle' })
    }
  ];

  private rightBarVisibleSubscription?: Subscription;
  private panelToggleService = inject(PanelToggleService);
  private buttonsDockSubscription?: Subscription;
  private router = inject(Router);



  ngOnInit(): void {
    this.rightBarVisibleSubscription = this.panelToggleService.rightBarVisible$.subscribe(
      visible => this.rightBarVisible = visible
    );
    this.buttonsDockSubscription = this.panelToggleService.buttonsDockStatus$.subscribe(
      status => {
        this.dockPosition = status as 'bottom' | 'top' | 'left' | 'right';
        console.log('map page dockPosition: ' + this.dockPosition);
      }
    );
  }

  toggleDock() {
    const currentStatus = this.panelToggleService.getButtonsDockStatus();
    const newStatus = currentStatus === DockPosition.Left ? DockPosition.Bottom : DockPosition.Left;
    console.log('newStatus: ' + newStatus + ' currentStatus: ' + currentStatus);
    this.panelToggleService.setButtonsDockStatus(newStatus);
  }

  onItemClick(item: any) {
    console.log('Button clicked:', item.label);
    
    switch(item.action) {
      case 'search':
        console.log('Search clicked');
        // Add search functionality here
        break;
      case 'layers':
        console.log('Layers clicked');
        // Add layers functionality here
        break;
      case 'settings':
        console.log('Settings clicked');
        this.router.navigate(['/settings']);
        break;
      case 'map':
        console.log('Map clicked');
        this.router.navigate(['/map']);
        break;
      case 'toggle':
        console.log('Toggle clicked');
        this.toggleDock();
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.rightBarVisibleSubscription) {
      this.rightBarVisibleSubscription.unsubscribe();
    }
    if (this.buttonsDockSubscription) {
      this.buttonsDockSubscription.unsubscribe();
    }
  }
}