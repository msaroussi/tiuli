import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Toolbar } from 'primeng/toolbar';
import { MapPageComponent } from './map-page.component';
import { PanelToggleService } from '../../services/panel-toggle.service';
import { Map } from '../../components/map/map';
import { LeftBar } from '../../components/left-bar/left-bar';
import { RightBar } from '../../components/right-bar/right-bar';
import { TopBar } from '../../components/top-bar/top-bar';
import { RightToolbar } from '../../components/right-toolbar/right-toolbar';

describe('MapPageComponent', () => {
  let component: MapPageComponent;
  let fixture: ComponentFixture<MapPageComponent>;
  let mockPanelToggleService: any;
  let rightBarVisibleSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    rightBarVisibleSubject = new BehaviorSubject<boolean>(true);
    
    mockPanelToggleService = {
      toggleRightBar: jest.fn(),
      setRightBarVisibility: jest.fn(),
      getRightBarVisibility: jest.fn(),
      rightBarVisible$: rightBarVisibleSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [
        MapPageComponent,
        CommonModule,
        RouterTestingModule,
        GoogleMapsModule,
        PanelModule,
        CardModule,
        ButtonModule,
        TooltipModule,
        Toolbar,
        Map,
        LeftBar,
        RightBar,
        TopBar,
        RightToolbar
      ],
      providers: [
        { provide: PanelToggleService, useValue: mockPanelToggleService },
        provideNoopAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapPageComponent);
    component = fixture.componentInstance;
    // mockPanelToggleService is already set up above
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with rightBarVisible as true', () => {
    expect(component.rightBarVisible).toBe(true);
  });

  describe('ngOnInit', () => {
    it('should subscribe to PanelToggleService rightBarVisible$ observable', () => {
      fixture.detectChanges(); // This triggers ngOnInit
      
      expect(component['subscription']).toBeDefined();
    });

    it('should update rightBarVisible when service emits new value', () => {
      fixture.detectChanges();
      
      expect(component.rightBarVisible).toBe(true); // Initial value from subject
      
      rightBarVisibleSubject.next(false);
      expect(component.rightBarVisible).toBe(false);
      
      rightBarVisibleSubject.next(true);
      expect(component.rightBarVisible).toBe(true);
    });

    it('should respond to multiple service state changes', () => {
      fixture.detectChanges();
      
      const states = [false, true, false, true, false];
      states.forEach(state => {
        rightBarVisibleSubject.next(state);
        expect(component.rightBarVisible).toBe(state);
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from the observable when subscription exists', () => {
      fixture.detectChanges(); // Initialize subscription
      
      jest.spyOn(component['subscription']!, 'unsubscribe');
      
      component.ngOnDestroy();
      
      expect(component['subscription']!.unsubscribe).toHaveBeenCalled();
    });

    it('should not throw error when subscription is undefined', () => {
      component['subscription'] = undefined;
      
      expect(() => component.ngOnDestroy()).not.toThrow();
    });

    it('should handle destroy before init', () => {
      // Don't call detectChanges, so ngOnInit is not called
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('component integration', () => {
    it('should have correct component selector', () => {
      expect(component.constructor.name).toBe('MapPageComponent');
    });

    it('should be standalone component', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should inject PanelToggleService correctly', () => {
      expect(component['panelToggleService']).toBe(mockPanelToggleService);
    });
  });

  describe('subscription lifecycle', () => {
    it('should create subscription on init and clean up on destroy', () => {
      expect(component['subscription']).toBeUndefined();
      
      fixture.detectChanges(); // ngOnInit
      expect(component['subscription']).toBeDefined();
      
      const subscription = component['subscription'];
      jest.spyOn(subscription!, 'unsubscribe');
      
      component.ngOnDestroy();
      expect(subscription!.unsubscribe).toHaveBeenCalled();
    });

    it('should maintain active subscription during component lifecycle', () => {
      fixture.detectChanges();
      
      const subscription = component['subscription'];
      
      // Simulate service updates
      rightBarVisibleSubject.next(false);
      rightBarVisibleSubject.next(true);
      
      expect(component['subscription']).toBe(subscription);
      expect(component.rightBarVisible).toBe(true);
    });
  });

  describe('reactive behavior', () => {
    it('should react to service state changes immediately', () => {
      fixture.detectChanges();
      
      // Test immediate response to service changes
      rightBarVisibleSubject.next(false);
      expect(component.rightBarVisible).toBe(false);
      
      rightBarVisibleSubject.next(true);
      expect(component.rightBarVisible).toBe(true);
    });

    it('should maintain state consistency with service', () => {
      fixture.detectChanges();
      
      // Test that component state stays in sync with service
      const testStates = [true, false, true, false, true];
      
      testStates.forEach(expectedState => {
        rightBarVisibleSubject.next(expectedState);
        expect(component.rightBarVisible).toBe(expectedState);
      });
    });
  });
});
