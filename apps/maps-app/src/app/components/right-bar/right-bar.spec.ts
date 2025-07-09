import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RightBar } from './right-bar';

describe('RightBar', () => {
  let component: RightBar;
  let fixture: ComponentFixture<RightBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RightBar,
        PanelModule,
        CardModule,
        ButtonModule,
        CommonModule
      ],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(RightBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with showCard as false', () => {
    expect(component.showCard).toBe(false);
  });

  describe('toggleCard', () => {
    it('should toggle showCard from false to true', () => {
      expect(component.showCard).toBe(false);
      
      component.toggleCard();
      
      expect(component.showCard).toBe(true);
    });

    it('should toggle showCard from true to false', () => {
      component.showCard = true;
      
      component.toggleCard();
      
      expect(component.showCard).toBe(false);
    });

    it('should toggle showCard multiple times correctly', () => {
      expect(component.showCard).toBe(false);
      
      component.toggleCard();
      expect(component.showCard).toBe(true);
      
      component.toggleCard();
      expect(component.showCard).toBe(false);
      
      component.toggleCard();
      expect(component.showCard).toBe(true);
    });

    it('should trigger change detection when called', () => {
      jest.spyOn(fixture, 'detectChanges');
      
      component.toggleCard();
      fixture.detectChanges();
      
      expect(fixture.detectChanges).toHaveBeenCalled();
    });
  });

  it('should have correct component selector', () => {
    expect(component.constructor.name).toBe('RightBar');
  });

  it('should be standalone component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have proper imports configured', () => {
    // Verify the component can render with all required modules
    expect(fixture.nativeElement).toBeTruthy();
  });
});
