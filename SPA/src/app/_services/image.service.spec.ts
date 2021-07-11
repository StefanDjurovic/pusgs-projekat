/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { imageService } from './image.service';

describe('Service: Image', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [imageService]
    });
  });

  it('should ...', inject([imageService], (service: imageService) => {
    expect(service).toBeTruthy();
  }));
});
