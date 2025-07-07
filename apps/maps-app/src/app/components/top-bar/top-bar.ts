import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [PanelModule, ButtonModule, RouterLink, Toolbar],
  templateUrl: './top-bar.html',
  styleUrls: ['./top-bar.css']
})
export class TopBar {
  
}