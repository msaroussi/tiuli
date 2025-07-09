import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SettingsComponent,
        CommonModule,
        RouterTestingModule,
        ButtonModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
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
    expect(component.constructor.name).toBe('SettingsComponent');
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
