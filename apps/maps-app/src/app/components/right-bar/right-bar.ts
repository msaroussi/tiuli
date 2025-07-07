import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-bar',
  standalone: true,
  imports: [PanelModule, CardModule, ButtonModule, CommonModule],
  templateUrl: './right-bar.html',
  styleUrls: ['./right-bar.css']
})
export class RightBar {
  showCard = false;

  toggleCard() {
    this.showCard = !this.showCard;
  }
}