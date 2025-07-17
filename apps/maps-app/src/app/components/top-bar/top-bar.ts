import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { DockModule } from 'primeng/dock';
import { MenuItem } from 'primeng/api';
import { PanelToggleService, DockPosition } from '../../services/panel-toggle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [PanelModule, ButtonModule, RouterLink, Toolbar, DockModule],
  templateUrl: './top-bar.html',
  styleUrls: ['./top-bar.css']
})
export class TopBar {
  dockPosition: 'bottom' | 'top' | 'left' | 'right' = 'top';
  private panelToggleService = inject(PanelToggleService);

  toggleDock() {
    const currentStatus = this.panelToggleService.getButtonsDockStatus();
    const newStatus = currentStatus === DockPosition.Left ? DockPosition.Bottom : DockPosition.Left;
    console.log('newStatus: ' + newStatus + ' currentStatus: ' + currentStatus);
    this.panelToggleService.setButtonsDockStatus(newStatus);
  }
}