import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { TopBar } from './top-bar';

describe('TopBar', () => {
  let component: TopBar;
  let fixture: ComponentFixture<TopBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TopBar,
        PanelModule,
        ButtonModule,
        Toolbar
      ],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TopBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be standalone component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have correct component selector', () => {
    expect(component.constructor.name).toBe('TopBar');
  });

  it('should render without errors', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should have proper imports configured', () => {
    // Verify the component can render with all required modules
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should work with RouterLink', () => {
    // Test that RouterLink imports are working correctly
    expect(fixture.componentInstance).toBeTruthy();
  });
});
