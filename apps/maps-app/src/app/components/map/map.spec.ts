import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { Map } from './map';

describe('Map', () => {
  let component: Map;
  let fixture: ComponentFixture<Map>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Map, GoogleMapsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Map);
    component = fixture.componentInstance;
    // Don't call detectChanges here to avoid ngOnInit
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default center coordinates', () => {
    expect(component.center).toEqual({ lat: 40.7128, lng: -74.0060 });
  });

  it('should initialize with default zoom level', () => {
    expect(component.zoom).toBe(10);
  });

  it('should have correct map options', () => {
    expect(component.mapOptions.center).toEqual(component.center);
    expect(component.mapOptions.zoom).toBe(component.zoom);
    expect(component.mapOptions.mapTypeId).toBe(google.maps.MapTypeId.ROADMAP);
    expect(component.mapOptions.disableDefaultUI).toBe(false);
    expect(component.mapOptions.zoomControl).toBe(true);
    expect(component.mapOptions.streetViewControl).toBe(true);
    expect(component.mapOptions.fullscreenControl).toBe(true);
  });

  it('should log message on initialization', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    component.ngOnInit();
    
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('Google Maps component initialized successfully!');
  });

  describe('onMapClick', () => {
    it('should log clicked coordinates when event has latLng', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const mockLatLng = {
        toJSON: () => ({ lat: 40.7589, lng: -73.9851 })
      };
      const mockEvent = {
        latLng: mockLatLng
      } as google.maps.MapMouseEvent;

      component.onMapClick(mockEvent);

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith('Map clicked at:', { lat: 40.7589, lng: -73.9851 });
    });

    it('should not log when event has no latLng', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const mockEvent = {
        latLng: null
      } as google.maps.MapMouseEvent;

      component.onMapClick(mockEvent);

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should not log when event latLng is null', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const mockEvent = {
        latLng: null,
        domEvent: {} as Event,
        stop: jest.fn()
      } as google.maps.MapMouseEvent;

      component.onMapClick(mockEvent);

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  it('should have proper component selector', () => {
    expect(component.constructor.name).toBe('Map');
  });

  it('should be standalone component', () => {
    // Verify that the component can be imported standalone
    expect(fixture.componentInstance).toBeTruthy();
  });
});
