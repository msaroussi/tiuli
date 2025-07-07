import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelToggleService {
  private rightBarVisibleSubject = new BehaviorSubject<boolean>(false);
  public rightBarVisible$ = this.rightBarVisibleSubject.asObservable();

  constructor() { }

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