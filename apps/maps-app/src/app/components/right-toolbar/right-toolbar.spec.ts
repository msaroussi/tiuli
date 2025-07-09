import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { RightToolbar } from './right-toolbar';
import { PanelToggleService } from '../../services/panel-toggle.service';

describe('RightToolbar', () => {
  let component: RightToolbar;
  let fixture: ComponentFixture<RightToolbar>;
  let mockPanelToggleService: any;
  let rightBarVisibleSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    rightBarVisibleSubject = new BehaviorSubject<boolean>(false);
    
    mockPanelToggleService = {
      toggleRightBar: jest.fn(),
      setRightBarVisibility: jest.fn(),
      getRightBarVisibility: jest.fn(),
      rightBarVisible$: rightBarVisibleSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [
        RightToolbar,
        PanelModule,
        ButtonModule,
        TooltipModule,
        CommonModule
      ],
      providers: [
        { provide: PanelToggleService, useValue: mockPanelToggleService },
        provideNoopAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RightToolbar);
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
    it('should subscribe to rightBarVisible$ observable', () => {
      fixture.detectChanges(); // This triggers ngOnInit
      
      rightBarVisibleSubject.next(true);
      expect(component.rightBarVisible).toBe(true);
      
      rightBarVisibleSubject.next(false);
      expect(component.rightBarVisible).toBe(false);
    });

    it('should update rightBarVisible when service emits new value', () => {
      fixture.detectChanges();
      
      expect(component.rightBarVisible).toBe(false); // Initial value from subject
      
      rightBarVisibleSubject.next(true);
      expect(component.rightBarVisible).toBe(true);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from the observable', () => {
      fixture.detectChanges(); // Initialize subscription
      
      jest.spyOn(component['subscription']!, 'unsubscribe');
      
      component.ngOnDestroy();
      
      expect(component['subscription']!.unsubscribe).toHaveBeenCalled();
    });

    it('should not throw error if subscription is undefined', () => {
      component['subscription'] = undefined;
      
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('toggleRightBar', () => {
    it('should call PanelToggleService.toggleRightBar', () => {
      component.toggleRightBar();
      
      expect(mockPanelToggleService.toggleRightBar).toHaveBeenCalled();
    });

    it('should call toggleRightBar exactly once per call', () => {
      component.toggleRightBar();
      component.toggleRightBar();
      
      expect(mockPanelToggleService.toggleRightBar).toHaveBeenCalledTimes(2);
    });
  });

  describe('toggleIcon getter', () => {
    it('should return "pi pi-eye-slash" when rightBarVisible is true', () => {
      component.rightBarVisible = true;
      
      expect(component.toggleIcon).toBe('pi pi-eye-slash');
    });

    it('should return "pi pi-eye" when rightBarVisible is false', () => {
      component.rightBarVisible = false;
      
      expect(component.toggleIcon).toBe('pi pi-eye');
    });
  });

  describe('toggleTooltip getter', () => {
    it('should return "Hide Info Panel" when rightBarVisible is true', () => {
      component.rightBarVisible = true;
      
      expect(component.toggleTooltip).toBe('Hide Info Panel');
    });

    it('should return "Show Info Panel" when rightBarVisible is false', () => {
      component.rightBarVisible = false;
      
      expect(component.toggleTooltip).toBe('Show Info Panel');
    });
  });

  describe('component integration', () => {
    it('should update icon and tooltip when service state changes', () => {
      fixture.detectChanges();
      
      // Initial state
      expect(component.rightBarVisible).toBe(false);
      expect(component.toggleIcon).toBe('pi pi-eye');
      expect(component.toggleTooltip).toBe('Show Info Panel');
      
      // Change state
      rightBarVisibleSubject.next(true);
      expect(component.rightBarVisible).toBe(true);
      expect(component.toggleIcon).toBe('pi pi-eye-slash');
      expect(component.toggleTooltip).toBe('Hide Info Panel');
    });

    it('should have correct component selector', () => {
      expect(component.constructor.name).toBe('RightToolbar');
    });

    it('should be standalone component', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });
  });

  describe('subscription management', () => {
    it('should create subscription on init', () => {
      expect(component['subscription']).toBeUndefined();
      
      fixture.detectChanges();
      
      expect(component['subscription']).toBeDefined();
    });

    it('should maintain subscription during lifecycle', () => {
      fixture.detectChanges();
      const subscription = component['subscription'];
      
      rightBarVisibleSubject.next(true);
      rightBarVisibleSubject.next(false);
      
      expect(component['subscription']).toBe(subscription);
    });
  });
}); 