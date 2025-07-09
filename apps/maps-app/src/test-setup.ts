import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

// Mock Google Maps API
Object.defineProperty(window, 'google', {
  value: {
    maps: {
      MapTypeId: {
        ROADMAP: 'roadmap'
      },
      LatLng: class MockLatLng {
        constructor(public lat: number, public lng: number) {}
        toJSON() { return { lat: this.lat, lng: this.lng }; }
      },
      importLibrary: jest.fn().mockResolvedValue({})
    }
  }
});
