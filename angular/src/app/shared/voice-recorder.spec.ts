import { TestBed } from '@angular/core/testing';

import { VoiceRecorder } from './voice-recorder';

describe('VoiceRecorder', () => {
  let service: VoiceRecorder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceRecorder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
