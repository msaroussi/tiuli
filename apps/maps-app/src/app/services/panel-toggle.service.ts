import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum DockPosition {
  Top = 'top',
  Left = 'left',
  Bottom = 'bottom',
  Right = 'right'
}

@Injectable({
  providedIn: 'root'
})
export class PanelToggleService {
  private buttonsDockStatusSubject = new BehaviorSubject<DockPosition>(DockPosition.Top);
  public buttonsDockStatus$ = this.buttonsDockStatusSubject.asObservable();

  getButtonsDockStatus(): DockPosition {
    return this.buttonsDockStatusSubject.value;
  }

  setButtonsDockStatus(status: DockPosition): void {
    // const currentValue = this.buttonsDockStatusSubject.value;
    this.buttonsDockStatusSubject.next(status);
  }

  private rightBarVisibleSubject = new BehaviorSubject<boolean>(false);
  public rightBarVisible$ = this.rightBarVisibleSubject.asObservable();

  toggleRightBar(): void {
    const currentValue = this.rightBarVisibleSubject.value;
    this.rightBarVisibleSubject.next(!currentValue);
  }
 
  setRightBarVisibility(visible: boolean): void {
    this.rightBarVisibleSubject.next(visible);
  }

  getRightBarVisibility(): boolean {
    return this.rightBarVisibleSubject.value;
  }
} 