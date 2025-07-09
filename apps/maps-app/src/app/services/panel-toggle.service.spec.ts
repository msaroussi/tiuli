import { TestBed } from '@angular/core/testing';
import { PanelToggleService } from './panel-toggle.service';

describe('PanelToggleService', () => {
  let service: PanelToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with rightBarVisible as false', () => {
    expect(service.getRightBarVisibility()).toBe(false);
  });

  it('should have rightBarVisible$ observable initialized with false', (done) => {
    service.rightBarVisible$.subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });

  describe('toggleRightBar', () => {
    it('should toggle from false to true', () => {
      expect(service.getRightBarVisibility()).toBe(false);
      
      service.toggleRightBar();
      
      expect(service.getRightBarVisibility()).toBe(true);
    });

    it('should toggle from true to false', () => {
      service.setRightBarVisibility(true);
      expect(service.getRightBarVisibility()).toBe(true);
      
      service.toggleRightBar();
      
      expect(service.getRightBarVisibility()).toBe(false);
    });

    it('should emit new value to observable when toggled', (done) => {
      let callCount = 0;
      service.rightBarVisible$.subscribe(value => {
        callCount++;
        if (callCount === 1) {
          expect(value).toBe(false); // Initial value
        } else if (callCount === 2) {
          expect(value).toBe(true); // After toggle
          done();
        }
      });
      
      service.toggleRightBar();
    });
  });

  describe('setRightBarVisibility', () => {
    it('should set visibility to true', () => {
      service.setRightBarVisibility(true);
      
      expect(service.getRightBarVisibility()).toBe(true);
    });

    it('should set visibility to false', () => {
      service.setRightBarVisibility(true);
      service.setRightBarVisibility(false);
      
      expect(service.getRightBarVisibility()).toBe(false);
    });

    it('should emit new value to observable when set', (done) => {
      let callCount = 0;
      service.rightBarVisible$.subscribe(value => {
        callCount++;
        if (callCount === 1) {
          expect(value).toBe(false); // Initial value
        } else if (callCount === 2) {
          expect(value).toBe(true); // After setting to true
          done();
        }
      });
      
      service.setRightBarVisibility(true);
    });

    it('should allow setting the same value multiple times', () => {
      service.setRightBarVisibility(true);
      service.setRightBarVisibility(true);
      
      expect(service.getRightBarVisibility()).toBe(true);
    });
  });

  describe('getRightBarVisibility', () => {
    it('should return current visibility state', () => {
      expect(service.getRightBarVisibility()).toBe(false);
      
      service.setRightBarVisibility(true);
      expect(service.getRightBarVisibility()).toBe(true);
      
      service.setRightBarVisibility(false);
      expect(service.getRightBarVisibility()).toBe(false);
    });
  });

  describe('rightBarVisible$ observable', () => {
    it('should emit all changes in sequence', (done) => {
      const expectedValues = [false, true, false, true];
      let currentIndex = 0;

      service.rightBarVisible$.subscribe(value => {
        expect(value).toBe(expectedValues[currentIndex]);
        currentIndex++;
        
        if (currentIndex === expectedValues.length) {
          done();
        }
      });

      // Trigger the sequence of changes
      service.setRightBarVisibility(true);
      service.setRightBarVisibility(false);
      service.toggleRightBar();
    });

    it('should allow multiple subscribers', (done) => {
      let subscriber1Called = false;
      let subscriber2Called = false;

      service.rightBarVisible$.subscribe(value => {
        if (!subscriber1Called) {
          expect(value).toBe(false);
          subscriber1Called = true;
          checkBothCalled();
        }
      });

      service.rightBarVisible$.subscribe(value => {
        if (!subscriber2Called) {
          expect(value).toBe(false);
          subscriber2Called = true;
          checkBothCalled();
        }
      });

      function checkBothCalled() {
        if (subscriber1Called && subscriber2Called) {
          done();
        }
      }
    });
  });
}); 