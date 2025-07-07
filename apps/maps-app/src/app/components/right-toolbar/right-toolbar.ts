import { Component, OnInit, OnDestroy } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PanelToggleService } from '../../services/panel-toggle.service';

@Component({
  selector: 'app-right-toolbar',
  standalone: true,
  imports: [PanelModule, ButtonModule, TooltipModule, CommonModule],
  templateUrl: 'right-toolbar.html',
  styleUrls: ['right-toolbar.css']
})
export class RightToolbar implements OnInit, OnDestroy {
  rightBarVisible = true;
  private subscription?: Subscription;
  
  constructor(private panelToggleService: PanelToggleService) {}

  ngOnInit(): void {
    this.subscription = this.panelToggleService.rightBarVisible$.subscribe(
      visible => this.rightBarVisible = visible
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleRightBar(): void {
    this.panelToggleService.toggleRightBar();
  }

  get toggleIcon(): string {
    return this.rightBarVisible ? 'pi pi-eye-slash' : 'pi pi-eye';
  }

  get toggleTooltip(): string {
    return this.rightBarVisible ? 'Hide Info Panel' : 'Show Info Panel';
  }
} 