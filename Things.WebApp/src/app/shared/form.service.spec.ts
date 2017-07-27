import { TestBed, inject } from '@angular/core/testing';

import { FormService } from './form.service';

describe('FormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormService]
    });
  });

  it('should ...', inject([FormService], (service: FormService) => {
    expect(service).toBeTruthy();
  }));
});
