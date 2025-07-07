import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Map } from '../../components/map/map';
import { LeftBar } from '../../components/left-bar/left-bar';
import { RightBar } from '../../components/right-bar/right-bar';
import { TopBar } from '../../components/top-bar/top-bar';
import { RightToolbar } from '../../components/right-toolbar/right-toolbar';
import { PanelToggleService } from '../../services/panel-toggle.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    CommonModule,
    Map,
    LeftBar,
    RightBar,
    TopBar,
    RightToolbar
  ],
  templateUrl: 'map-page.component.html',
  styleUrls: ['map-page.component.css']
})
export class MapPageComponent implements OnInit, OnDestroy {
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
}