import { TestBed } from '@angular/core/testing';

import { StoryMangerService } from './story-manger.service';

describe('StoryMangerService', () => {
  let service: StoryMangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryMangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
