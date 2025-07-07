import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [PanelModule, ButtonModule, TooltipModule, CommonModule],
  templateUrl: 'left-bar.html',
  styleUrls: ['left-bar.css']
})
export class LeftBar {
  
}