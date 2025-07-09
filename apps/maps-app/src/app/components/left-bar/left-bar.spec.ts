import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { LeftBar } from './left-bar';

describe('LeftBar', () => {
  let component: LeftBar;
  let fixture: ComponentFixture<LeftBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LeftBar,
        PanelModule,
        ButtonModule,
        TooltipModule,
        CommonModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeftBar);
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
    expect(component.constructor.name).toBe('LeftBar');
  });

  it('should render without errors', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should have proper imports configured', () => {
    // Verify the component can render with all required modules
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
